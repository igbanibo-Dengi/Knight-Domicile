'use server'

import * as v from 'valibot'
import { SignupSchema } from "@/validators/signup-validator"
import bcrypt from 'bcrypt'

type Res =
    | { success: true }
    | { success: false; error: v.FlatErrors<undefined>; statusCode: 400 }
    | { success: false; error: string; statusCode: 500 }

export async function signUpAction(values: unknown): Promise<Res> {
    const parsedValues = v.safeParse(SignupSchema, values);

    if (!parsedValues.success) {
        const flatErors = v.flatten(parsedValues.issues);
        console.log(flatErors)
        return { success: false, error: flatErors, statusCode: 400 }

    }
    const { name, email, password } = parsedValues.output;


    try {
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10)
        console.log({ name, email, password: hashedPassword });

        //Save user to database
    } catch (err) {
        console.error(err)
        return { success: false, error: "Internal Server Error", statusCode: 500 }
    }

    return { success: true }
}