"use server"

import { UserTable } from "@/drizzle/schema";
import { getUserIdTag } from "./dbCache";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { db } from "@/drizzle/db";
import { eq } from "drizzle-orm";

export async function getUser(id: string) {
    "use cache";
    cacheTag(getUserIdTag(id));

    // console.log("fetching user from db with id", id);

    return db.query.UserTable.findFirst({
        where: eq(UserTable.id, id),
    });
}
