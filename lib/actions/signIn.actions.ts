"use server"

import { signIn } from "@/auth";

type Res =
    | { success: true }
    | { success: false; error: string; statusCode: 500 };

export async function signInAction(values: unknown): Promise<Res> {
    try {
        if (typeof values != "object" ||
            values === null ||
            Array.isArray(values)
        ) {
            throw new Error("Invalid JSON Object")
        }

        await signIn("credentials", { ...values, redirect: false });

    } catch (err) {
        console.error(err)
        return { success: false, error: "Internal Server Error", statusCode: 500 };
    }

    return { success: true }
}