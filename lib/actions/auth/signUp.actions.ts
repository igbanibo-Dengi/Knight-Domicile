'use server'

import * as v from 'valibot'
import { SignupSchema } from "@/validators/signup-validator"
import bcrypt from 'bcrypt'
import db from '@/drizzle'
import { lower, users } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'

type Res =
    | { success: true }
    | { success: false; error: v.FlatErrors<undefined>; statusCode: 400 }
    | { success: false; error: string; statusCode: 409 | 500 }

export async function signUpAction(values: unknown): Promise<Res> {
    const parsedValues = v.safeParse(SignupSchema, values);

    if (!parsedValues.success) {
        const flatErors = v.flatten(parsedValues.issues);
        console.log(flatErors)
        return { success: false, error: flatErors, statusCode: 400 }

    }
    const { name, email, password } = parsedValues.output;

    // Case-insensitive email handling in PostgreSQL with Drizzle
    try {
        const exixstingUser = await db
            .select({ id: users.id })
            .from(users)
            .where(eq(lower(users.email), email.toLowerCase()))
            .then(res => res[0] ?? null);

        if (exixstingUser?.id) {
            return { success: false, error: "A user with this email already exists", statusCode: 409 }
        }
    } catch (err) {
        console.error(err);
        return { success: false, error: "Internal Server Error", statusCode: 500 };
    }


    try {
        // Hash password with bcrypt
        const hashedPassword = await bcrypt.hash(password, 10)
        // console.log({ name, email, password: hashedPassword });

        //Save user to database
        const newUser = await db
            .insert(users)
            .values({
                name, email, password: hashedPassword
            })
            .returning({ id: users.id })
            .then((res) => res[0])

        // console.log({ insetedId: newUser.id });


    } catch (err) {
        console.error(err)
        return { success: false, error: "Internal Server Error", statusCode: 500 }
    }

    return { success: true }
}