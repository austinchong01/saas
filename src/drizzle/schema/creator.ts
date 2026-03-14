import { pgTable, varchar } from "drizzle-orm/pg-core";
import { id, createdAt, updatedAt } from "../schemaHelpers";

export const CreatorTable = pgTable("creators", {
    id,
    username: varchar().notNull().unique(),
    profile_image: varchar(),
    bio: varchar(),
    // country: varchar(), available?
    followers: varchar(), // Using varchar to store bigints as strings
    likes: varchar(),
    content_type: varchar(),
    median_views: varchar(),
    tt_link: varchar(),
    engagement_rate: varchar(),
    starting_price: varchar(),
    starting_price_currency: varchar(),
    // videos, 
    createdAt,
    updatedAt,
});
