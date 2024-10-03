import { sql, SQL } from "drizzle-orm";
import {
    boolean,
    timestamp,
    pgTable,
    text,
    primaryKey,
    integer,
    pgEnum,
    type AnyPgColumn,
    uniqueIndex,
    numeric,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

// custom lower function
export function lower(email: AnyPgColumn): SQL {
    return sql`lower(${email})`;
}

export const roleEnum = pgEnum("role", ["user", "admin"]);

export const users = pgTable(
    "user",
    {
        id: text("id")
            .primaryKey()
            .$defaultFn(() => crypto.randomUUID()),
        name: text("name"),
        email: text("email").notNull(),
        emailVerified: timestamp("emailVerified", { mode: "date" }),
        image: text("image"),
        password: text("password"),
        role: roleEnum("role").notNull().default("user"),
    },
    (table) => ({
        emailUniqueIndex: uniqueIndex("emailUniqueIndex").on(lower(table.email)),
    }),
);

export const adminUserEmailAddresses = pgTable(
    "adminUserEmailAddresses",
    {
        id: text("id")
            .primaryKey()
            .$defaultFn(() => crypto.randomUUID()),
        email: text("email").notNull(),
    },
    (table) => ({
        adminEmailUniqueIndex: uniqueIndex("adminEmailUniqueIndex").on(
            lower(table.email),
        ),
    }),
);

export const accounts = pgTable(
    "account",
    {
        userId: text("userId")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        type: text("type").$type<AdapterAccountType>().notNull(),
        provider: text("provider").notNull(),
        providerAccountId: text("providerAccountId").notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: text("token_type"),
        scope: text("scope"),
        id_token: text("id_token"),
        session_state: text("session_state"),
    },
    (account) => ({
        compoundKey: primaryKey({
            columns: [account.provider, account.providerAccountId],
        }),
    }),
);

export const sessions = pgTable("session", {
    sessionToken: text("sessionToken").primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
    "verificationToken",
    {
        identifier: text("identifier").notNull(),
        token: text("token").notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (verificationToken) => ({
        compositePk: primaryKey({
            columns: [verificationToken.identifier, verificationToken.token],
        }),
    }),
);

export const authenticators = pgTable(
    "authenticator",
    {
        credentialID: text("credentialID").notNull().unique(),
        userId: text("userId")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        providerAccountId: text("providerAccountId").notNull(),
        credentialPublicKey: text("credentialPublicKey").notNull(),
        counter: integer("counter").notNull(),
        credentialDeviceType: text("credentialDeviceType").notNull(),
        credentialBackedUp: boolean("credentialBackedUp").notNull(),
        transports: text("transports"),
    },
    (authenticator) => ({
        compositePK: primaryKey({
            columns: [authenticator.userId, authenticator.credentialID],
        }),
    }),
);


export const statusEnum = pgEnum("status", ["rent", "sale"]);
export const typeEnum = pgEnum("type", ["residential", "commercial", "agricultural", "mixed-use"]);

export const properties = pgTable("property", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    images: text("images").array().notNull(),  // images array
    price: numeric("price", { precision: 15, scale: 2 }).notNull(),
    state: text("state").notNull(),
    status: statusEnum("status").notNull().default("sale"),
    city: text("city").notNull(),
    streetAddress: text("streetAddress").notNull(),
    lat: numeric("lat", { precision: 10, scale: 8 }),
    lon: numeric("lon", { precision: 11, scale: 8 }),
    plots: integer("plots"),
    type: typeEnum("type").notNull().default("residential"),
    size: numeric("size"),
    description: text("description").notNull(),
    isLand: boolean("isLand"),
    beds: integer("beds"),
    baths: integer("baths"),
    rooms: integer("rooms"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    adminId: text("adminId")
        .notNull()
        .references(() => users.id, { onDelete: "set null" }),
});


// Table to store saved/bookmarked properties
export const savedProperties = pgTable("saved_property", {
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }), // Reference to the user who saved the property
    propertyId: text("propertyId")
        .notNull()
        .references(() => properties.id, { onDelete: "cascade" }), // Reference to the saved property
}, (table) => ({
    compoundKey: primaryKey({
        columns: [table.userId, table.propertyId], // Composite primary key to ensure a user can't save the same property multiple times
    }),
}));