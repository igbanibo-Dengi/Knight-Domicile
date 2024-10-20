// @ts-nocheck
import "server-only";

export const revalidate = 0;

import db from "@/drizzle";
import { desc, eq, gte, lte, or, sql, and } from "drizzle-orm";
import { properties, savedProperties } from "@/drizzle/schema";
import { auth } from "@/auth";

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


export const findSavedProperties = async ({ userId }: { userId: string }): Promise<PropertyProp[]> => {

  try {
    // Select only the columns from the 'properties' table
    const saved = await db
      .select({
        id: properties.id,
        type: properties.type,
        status: properties.status,
        images: properties.images,
        price: properties.price,
        state: properties.state,
        city: properties.city,
        streetAddress: properties.streetAddress,
        description: properties.description,
        lat: properties.lat,
        lon: properties.lon,
        beds: properties.beds,
        baths: properties.baths,
        rooms: properties.rooms,
        plots: properties.plots,
        size: properties.size,
        isLand: properties.isLand,
        createdAt: properties.createdAt,
        updatedAt: properties.updatedAt,
        adminId: properties.adminId,
      })
      .from(savedProperties) // 'saved_property' table
      .innerJoin(properties, eq(savedProperties.propertyId, properties.id)) // Join with the 'properties' table
      .where(eq(savedProperties.userId, userId)) // Filter by userId
      .orderBy(desc(properties.createdAt)) // Order the results by createdAt
      .limit(8); // Limit the results to 8

    // console.log(saved);

    return saved;
  } catch (error) {
    console.error("Error fetching saved properties:", error);
    throw new Error("Failed to fetch saved properties");
  }
};