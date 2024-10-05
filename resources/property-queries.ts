import db from "@/drizzle";
import { properties } from "@/drizzle/schema";
import { desc, eq, gte, lte, or, sql, and } from "drizzle-orm";

export type PropertyProp = typeof properties.$inferSelect;

type SearchParams = {
    search?: string;
    minPrice?: string;
    maxPrice?: string;
    type?: string;
    state?: string;
    [key: string]: string | string[] | undefined;
};

export const findAllProperties = async (searchParams: SearchParams = {}): Promise<PropertyProp[]> => {
    try {
        const { search, minPrice, maxPrice, type, state } = searchParams;

        let query = db.select().from(properties);

        const conditions = [];

        // Price range condition
        const priceConditions = [];
        if (minPrice) {
            priceConditions.push(gte(properties.price, minPrice));
        }
        if (maxPrice) {
            priceConditions.push(lte(properties.price, maxPrice));
        }
        if (priceConditions.length > 0) {
            conditions.push(and(...priceConditions));
        }

        // Search condition
        if (search) {
            conditions.push(
                or(
                    sql`${properties.streetAddress} ILIKE ${`%${search}%`}`,
                    sql`${properties.city} ILIKE ${`%${search}%`}`,
                    sql`${properties.state} ILIKE ${`%${search}%`}`
                )
            );
        }

        if (type) {
            conditions.push(eq(properties.type, type as "residential" | "commercial" | "agricultural" | "mixed-use"));
        }

        // State condition
        if (state) {
            conditions.push(eq(properties.state, state));
        }

        // Apply all conditions to the query
        if (conditions.length > 0) {
            query = query.where(and(...conditions));
        }

        const allProperties = await query.orderBy(desc(properties.createdAt));

        return allProperties || []; // Ensure we always return an array
    } catch (error) {
        console.error("Error fetching properties:", error);
        return []; // Return an empty array in case of error
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
