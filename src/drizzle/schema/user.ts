import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "../schemaHelpers";

export const UserTable = pgTable("users", {
    id: varchar().primaryKey(), // Clerk does not use UUIDs (uses strings)
    email: varchar().notNull().unique(),
    name: varchar().notNull(),
    imageUrl: varchar().notNull(),
    createdAt,
    updatedAt,
})