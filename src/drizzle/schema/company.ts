import { pgTable, varchar } from "drizzle-orm/pg-core";
import { id, createdAt, updatedAt } from "../schemaHelpers";

export const CompanyTable = pgTable("company", {
    id,
    display_name: varchar().notNull().unique(),
    profile_image: varchar(),
    country: varchar(),
    createdAt,
    updatedAt,
});
