// app/actions/createProperty.ts
'use server'

import * as v from "valibot";
import { auth } from "@/auth";
import db from "@/drizzle";
import { USER_ROLES } from "@/lib/constants";
import { revalidatePath } from "next/cache";
import { properties } from "@/drizzle/schema";
import { propertySchema } from "@/validators/property-validator";
import { convertNumberToString } from "@/lib/utils";




type Res =
    | {
        success: true;
        data: typeof properties.$inferInsert;
    }
    | { success: false; error: v.FlatErrors<undefined>; statusCode: 400 }
    | { success: false; error: string; statusCode: 401 | 403 | 404 | 500 };



export async function createProperty(values: unknown): Promise<Res> {
    const parsedValues = v.safeParse(propertySchema, values);

    if (!parsedValues.success) {
        const flatErrors = v.flatten(parsedValues.issues);
        return { success: false, error: flatErrors, statusCode: 400 };
    }

    const { images, price, state, status, city, streetAddress, lat, lon, plots, type, size, description, isLand, beds, baths, rooms, adminId } = parsedValues.output;


    const newPrice = convertNumberToString(price)

    // const newSize = convertNumberToString(size);
    const session = await auth();

    if (!session?.user) {
        return { success: false, error: "Unauthorized", statusCode: 401 };
    }

    if (session.user.role !== USER_ROLES.ADMIN) {
        return { success: false, error: "Forbidden", statusCode: 403 };
    }

    try {
        const [createdProperty] = await db
            .insert(properties)
            .values({
                images,
                price: newPrice,
                state,
                status,
                city,
                streetAddress,
                lat: lat ?? null,
                lon: lon ?? null,
                plots: plots ?? null,
                type,
                size: size,
                description,
                isLand,
                beds: beds ?? null,
                baths: baths ?? null,
                rooms: rooms ?? null,
                adminId: adminId,
            } as typeof properties.$inferInsert)
            .returning();

        console.log(createdProperty);


        console.log("success: Property created successfully");


        return { success: true, data: createdProperty };
    } catch (error) {
        console.error(error);
        return { success: false, error: "Internal Server Error", statusCode: 500 };
    }
}