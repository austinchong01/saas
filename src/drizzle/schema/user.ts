import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createdAt, updatedAt, id } from "../schemaHelpers";

export const UserTable = pgTable("users", {
    id: varchar().primaryKey(),
    email: varchar().notNull().unique(),
    name: varchar().notNull(),
    imageUrl: varchar().notNull(),
    createdAt,
    updatedAt,
})