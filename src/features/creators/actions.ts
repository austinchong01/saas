"use server"

import { getCreatorIdTag } from "./cache";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import mockCreators from "@/data/mock/creators.json";

export async function getCreator(creatorId: string) {
    "use cache";
    cacheTag(getCreatorIdTag(creatorId));

    // TODO: Replace with TikTok API call once approved
    // const creator = await fetchTikTokCreator(creatorId);
    
    const creator = mockCreators.find(c => c.id === creatorId);
    return creator ?? null;
}
