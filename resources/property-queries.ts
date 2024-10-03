import "server-only"; // Strictly ensures server-side execution

import db from "@/drizzle";
import { properties } from "@/drizzle/schema";
import { desc, eq } from "drizzle-orm";

// Define TypeScript type for a property (optional but recommended)
export type PropertyProp = {
    id: string;
    images: string[];
    price: string;
    state: string;
    status: 'rent' | 'sale';
    city: string;
    streetAddress: string;
    lat: string | null;
    lon: string | null;
    plots: number | null;
    type: "residential" | "commercial" | "agricultural" | "mixed-use"
    size: string | null;
    description: string;
    isLand: boolean | null;
    beds: number | null;
    baths: number | null;
    rooms: number | null;
    createdAt: Date;
    updatedAt: Date;
    adminId: string;
};

// Async function to fetch all properties from the database
export const findAllProperties = async (): Promise<PropertyProp[]> => {
    try {
        // Fetch properties from the database, ordered by creation date (desc)
        const allProperties = await db
            .select()
            .from(properties)
            .orderBy(desc(properties.createdAt));

        return allProperties;
    } catch (error) {
        // Log and handle the error gracefully
        console.error("Error fetching properties:", error);
        throw new Error("Failed to fetch properties");
    }
};

// Async function to fetch a property by its ID
export const findPropertyById = async ({ id }: { id: string }) => {
    try {
        const property = await db
            .select()
            .from(properties)
            .where(eq(properties.id, id))
            .limit(1);

        return property;
    } catch (error) {
        console.error(`Error fetching property with ID ${id}:`, error);
        throw new Error("Failed to fetch the property");
    }
};

// Async function to fetch the latest 8 properties
export const findLatestProperties = async (): Promise<PropertyProp[]> => {
    try {
        const latestProperties = await db
            .select()
            .from(properties)
            .orderBy(desc(properties.createdAt))
            .limit(8);

        return latestProperties;
    } catch (error) {
        console.error("Error fetching latest properties:", error);
        throw new Error("Failed to fetch latest properties");
    }
};
