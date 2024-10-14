// app/actions/createProperty.ts
'use server'

import * as v from "valibot";
import { auth } from "@/auth";
import db from "@/drizzle";
import { USER_ROLES } from "@/lib/constants";
import { revalidatePath } from "next/cache";
import { properties, savedProperties } from "@/drizzle/schema";
import { propertySchema } from "@/validators/property-validator";
import { convertNumberToString } from "@/lib/utils";
import { User } from "next-auth";
import { and, eq } from "drizzle-orm";




type Res =
    | {
        success: true;
        data: typeof properties.$inferInsert;
    }
    | { success: false; error: v.FlatErrors<undefined>; statusCode: 400 }
    | { success: false; error: string; statusCode: 401 | 403 | 404 | 500 };


type Response =
    | {
        success: true;
        data: typeof savedProperties.$inferInsert;
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


export async function saveProperty(propertyId: string): Promise<{ success: boolean; error?: string; statusCode?: number; data?: any }> {
    const session = await auth();
    if (!session?.user) {
        return { success: false, error: "Unauthorized", statusCode: 401 };
    }
    const userId = session.user.id;

    if (!userId) {
        return { success: false, error: "no user", statusCode: 400 };
    }

    try {
        const [savedProperty] = await db
            .insert(savedProperties)
            .values({
                userId: userId,
                propertyId: propertyId
            })
            .returning();

        console.log("Property saved successfully:", savedProperty);

        return { success: true, data: savedProperty };
    } catch (error) {
        console.error("Error saving property:", error);
        return { success: false, error: "Internal Server Error", statusCode: 500 };
    }
}


export async function unSaveProperty(propertyId: string): Promise<{ success: boolean; error?: string; statusCode?: number; data?: any }> {
    const session = await auth();
    if (!session?.user) {
        return { success: false, error: "Unauthorized", statusCode: 401 };
    }
    const userId = session.user.id;

    if (!userId) {
        return { success: false, error: "no user", statusCode: 400 };
    }

    try {
        const [unSavedProperty] = await db
            .delete(savedProperties)
            .where(
                and(
                    eq(savedProperties.userId, userId),
                    eq(savedProperties.propertyId, propertyId)
                )
            )
            .returning();

        console.log("Property unsaved successfully:", unSavedProperty);

        return { success: true, data: unSavedProperty };
    } catch (error) {
        console.error("Error saving property:", error);
        return { success: false, error: "Internal Server Error", statusCode: 500 };
    }
}
