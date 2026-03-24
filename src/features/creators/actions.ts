"use server";

import { getCreatorIdTag } from "./cache";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import mockCreators from "@/data/mock/creators.json";
import { CreatorFilterFormValues, creatorFilterSchema } from "./schemas";
import { getCurrentUser } from "@/services/clerk/lib/getCurrentUser";
import { filtersToSearchParams } from "./url";

export async function getCreator(creatorId: string) {
  "use cache";
  cacheTag(getCreatorIdTag(creatorId));

  // TODO: Replace with TikTok API call once approved
  // const creator = await fetchTikTokCreator(creatorId);

  const creator = mockCreators.find((c) => c.id === creatorId);
  return creator ?? null;
}

async function getCreatorsByFilters(filters: CreatorFilterFormValues) {
  let results = [...mockCreators];

  // Keyword search (username, display_name, bio)
  // if (filters.keyword) {
  //   const kw = filters.keyword.toLowerCase();
  //   results = results.filter(
  //     (c) =>
  //       c.username.toLowerCase().includes(kw) ||
  //       c.display_name.toLowerCase().includes(kw) ||
  //       c.bio.toLowerCase().includes(kw),
  //   );
  // }

  // Content labels (multi-select)
  if (filters.contentLabels?.length) {
    results = results.filter((c) =>
      filters.contentLabels!.includes(c.content_type as typeof filters.contentLabels extends (infer U)[] | null ? U : never),
    );
  }

  // Creator country (multi-select)
  if (filters.countryCodes?.length) {
    results = results.filter((c) =>
      filters.countryCodes!.includes(c.country as any),
    );
  }

  // Languages (multi-select)
  if (filters.languages?.length) {
    results = results.filter((c) =>
      filters.languages!.some(
        (lang) => lang === c.language.toLowerCase().slice(0, 2),
      ),
    );
  }

  // Range filters
  if (filters.followersMin != null) {
    results = results.filter((c) => c.followers >= filters.followersMin!);
  }
  if (filters.followersMax != null) {
    results = results.filter((c) => c.followers <= filters.followersMax!);
  }

  if (filters.medianViewsMin != null) {
    results = results.filter((c) => c.median_views >= filters.medianViewsMin!);
  }
  if (filters.medianViewsMax != null) {
    results = results.filter((c) => c.median_views <= filters.medianViewsMax!);
  }

  if (filters.engagementRateMin != null) {
    results = results.filter(
      (c) => c.engagement_rate >= filters.engagementRateMin!,
    );
  }
  if (filters.engagementRateMax != null) {
    results = results.filter(
      (c) => c.engagement_rate <= filters.engagementRateMax!,
    );
  }

  // Audience country (multi-select)
  if (filters.followerCountryCodes?.length) {
    results = results.filter((c) =>
      filters.followerCountryCodes!.some((code) =>
        c.audience_countries.some((ac) => ac.country === code),
      ),
    );
  }

  // Audience gender ratio
  if (filters.followerGenderRatio?.length) {
    results = results.filter((c) =>
      filters.followerGenderRatio!.some((ratio) => {
        const [gender, threshold] = ratio.split("_");
        const percentage = Number(threshold);
        const match = c.audience_genders.find(
          (g) => g.gender === gender.toLowerCase(),
        );
        return match != null && match.percentage >= percentage;
      }),
    );
  }

  // Audience age
  if (filters.followerAge?.length) {
    results = results.filter((c) =>
      filters.followerAge!.some((ageRange) =>
        c.audience_ages.some(
          (a) => a.age === ageRange && a.percentage >= 20,
        ),
      ),
    );
  }

  results.sort((a, b) => b.followers - a.followers);
  const id = filtersToSearchParams(filters);
  return {results, id};
}

export async function createFilterInfo(unsafeData: CreatorFilterFormValues) {
  const { userId } = await getCurrentUser();
  if (userId == null) {
    return {
      error: true,
      message: "You do not have permission to do this.",
    };
  }

  const { success, data } = creatorFilterSchema.safeParse(unsafeData);
  if (!success) {
    return { error: true, message: "Invalid filter data." };
  }

  const filterInfo = await getCreatorsByFilters(data);

  return filterInfo;
}

// export async function editFilterInfo(){}
