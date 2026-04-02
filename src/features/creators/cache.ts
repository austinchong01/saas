// "use server"; ??

import { getIdTag, getUserTag } from "@/lib/dataCache";
import { revalidateTag } from "next/cache";

// creator data for all users
export function getCreatorIdTag(creatorId: string) {
    return getIdTag("creators", creatorId);
}

// user-specific tag for creator info
export function getCreatorInfoUserTag(userId: string) {
    return getUserTag("creators", userId);
}

// invalidate a specific creator + a user's creator data
export function revalidateCreatorCache({ userId, creatorId }: { userId: string; creatorId: string }) {
    revalidateTag(getCreatorInfoUserTag(userId), "max");
    revalidateTag(getCreatorIdTag(creatorId), "max");
}


// export function getCreatorGlobalTag() {
//     return getGlobalTag("creators");
// }
// export function revalidateAllCreatorsCache() {
//     revalidateTag(getCreatorGlobalTag());
// }