// "use server"; ??

import { getCreatorTag } from "@/lib/dataCache";
import { revalidateTag } from "next/cache";

export function getCreatorIdTag(creatorId: string) {
    return getCreatorTag("creators", creatorId);
}

export function revalidateCreatorCache(creatorId: string) {
    revalidateTag(getCreatorIdTag(creatorId));
}