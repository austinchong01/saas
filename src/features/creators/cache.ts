// "use server"; ??

import { getIdTag } from "@/lib/dataCache";
import { revalidateTag } from "next/cache";

export function getCreatorInfoUserTag(userId: string) {
    return getIdTag("creators", userId);
}

export function getCreatorIdTag(creatorId: string) {
    return getIdTag("creators", creatorId);
}

export function revalidateCreatorCache({ userId, creatorId }: { userId: string; creatorId: string }) {
    revalidateTag(getCreatorInfoUserTag(userId));
    revalidateTag(getCreatorIdTag(creatorId));
}