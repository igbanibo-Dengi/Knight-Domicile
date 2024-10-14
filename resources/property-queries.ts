// @ts-nocheck

import "server-only";

export const revalidate = 0;

import db from "@/drizzle";
import { desc, eq, gte, lte, or, sql, and } from "drizzle-orm";
import { properties } from "@/drizzle/schema";

export type PropertyProp = typeof properties.$inferSelect;

type SearchParams = {
  search?: string;
  minPrice?: string;
  maxPrice?: string;
  type?: string;
  state?: string;
  [key: string]: string | string[] | undefined;
};

export const findAllProperties = async (
  searchParams: SearchParams = {},
): Promise<any[]> => {
  try {
    const { search, minPrice, maxPrice, type, state } = searchParams;

    let query = db.select().from(properties);

    const conditions = [];

    // Price range condition
    if (minPrice) {
      conditions.push(gte(properties.price, minPrice));
    }
    if (maxPrice) {
      conditions.push(lte(properties.price, maxPrice));
    }

    // Search condition
    if (search) {
      conditions.push(
        or(
          sql`${properties.streetAddress} ILIKE ${`%${search}%`}`,
          sql`${properties.city} ILIKE ${`%${search}%`}`,
          sql`${properties.state} ILIKE ${`%${search}%`}`,
        ),
      );
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

    return allProperties;
  } catch (error) {
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

    console.log("latest properties", latestProperties.length);
    return latestProperties;
  } catch (error) {
    console.error("Error fetching latest properties:", error);
    throw new Error("Failed to fetch latest properties");
  }
};
