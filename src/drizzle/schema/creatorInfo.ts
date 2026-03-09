import { pgTable, varchar } from "drizzle-orm/pg-core";
import { id, createdAt, updatedAt } from "../schemaHelpers";

export const CreatorInfoTable = pgTable("creator_info", {
    id,
    display_name: varchar().notNull().unique(),
    profile_image: varchar(),
    country: varchar(),
    follower_cnt: varchar(), // Using varchar to store bigints as strings
    follower_growth: varchar(),
    liked_cnt: varchar(),
    median_views: varchar(),
    tt_link: varchar(),
    tcm_link: varchar(),
    engagement_rate: varchar(),
    starting_price: varchar(),
    starting_price_currency: varchar(),
    niche: varchar(), // keyword search?
    createdAt,
    updatedAt,
});
