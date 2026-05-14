// "use server"; ??

import { getIdTag, getUserTag } from "@/lib/dataCache";
import { revalidateTag } from "next/cache";
import { CreatorFilterFormValues } from "./schemas";
import { stripEmptyFields } from "@/lib/utils";

// creator data for all users
export function getCreatorIdTag(creatorId: string) {
    return getIdTag("creators", creatorId);
}

// user-specific tag for creator info
export function getCreatorInfoUserTag(userId: string) {
    return getUserTag("creators", userId);
}

export function getCreatorsByFiltersTag(filters: CreatorFilterFormValues) {
  const stripped = stripEmptyFields(filters);

  const parts = Object.keys(stripped)
    .sort()
    .map((key) => {
      const value = stripped[key as keyof typeof stripped];
      const serialized = Array.isArray(value)
        ? [...value].sort().join(",")
        : String(value);
      return `${key}:${serialized}`;
    });

  return `creators-by-filters:${parts.join("|")}`;
}

// invalidate a specific creator + a user's creator data
export function revalidateCreatorCache({ userId, creatorId, filters }: { userId: string; creatorId: string; filters: CreatorFilterFormValues }) {
    revalidateTag(getCreatorInfoUserTag(userId), "max");
    revalidateTag(getCreatorIdTag(creatorId), "max");
    revalidateTag(getCreatorsByFiltersTag(filters), "max");
}


// export function getCreatorGlobalTag() {
//     return getGlobalTag("creators");
// }
// export function revalidateAllCreatorsCache() {
//     revalidateTag(getCreatorGlobalTag());
// }