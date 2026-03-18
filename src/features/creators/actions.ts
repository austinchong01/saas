"use server";

import { getCreatorIdTag } from "./cache";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import mockCreators from "@/data/mock/creators.json";

export type CreatorFilters = {
  content_type?: string;
  followers_min?: number;
  followers_max?: number;
  median_views_min?: number;
  median_views_max?: number;
  engagement_rate_min?: number;
  engagement_rate_max?: number;
  country_code?: string;
  follower_country_codes?: string[];
  follower_gender_ratio?: {
    gender: string;
    min_percentage: number;
  };
  follower_age_min?: number;
  follower_age_max?: number;
};

export async function getCreator(creatorId: string) {
  "use cache";
  cacheTag(getCreatorIdTag(creatorId));

  // TODO: Replace with TikTok API call once approved
  // const creator = await fetchTikTokCreator(creatorId);

  const creator = mockCreators.find((c) => c.id === creatorId);
  return creator ?? null;
}

export async function getCreatorsByFilters(filters: CreatorFilters) {
  let results = [...mockCreators];

  // Exact match filters
  if (filters.content_type) {
    results = results.filter((c) => c.content_type === filters.content_type);
  }

  if (filters.country_code) {
    results = results.filter((c) => c.country === filters.country_code);
  }

  // Range filters
  if (filters.followers_min != null) {
    results = results.filter((c) => c.followers >= filters.followers_min!);
  }
  if (filters.followers_max != null) {
    results = results.filter((c) => c.followers <= filters.followers_max!);
  }

  if (filters.median_views_min != null) {
    results = results.filter(
      (c) => c.median_views >= filters.median_views_min!,
    );
  }
  if (filters.median_views_max != null) {
    results = results.filter(
      (c) => c.median_views <= filters.median_views_max!,
    );
  }

  if (filters.engagement_rate_min != null) {
    results = results.filter(
      (c) => c.engagement_rate >= filters.engagement_rate_min!,
    );
  }
  if (filters.engagement_rate_max != null) {
    results = results.filter(
      (c) => c.engagement_rate <= filters.engagement_rate_max!,
    );
  }

  // Audience demographic filters
  if (filters.follower_country_codes?.length) {
    results = results.filter((c) =>
      filters.follower_country_codes!.some((code) =>
        c.audience_countries.some((ac) => ac.country === code),
      ),
    );
  }

  if (filters.follower_gender_ratio) {
    const { gender, min_percentage } = filters.follower_gender_ratio;
    results = results.filter((c) => {
      const match = c.audience_genders.find((g) => g.gender === gender);
      return match != null && match.percentage >= min_percentage;
    });
  }

  if (filters.follower_age_min != null || filters.follower_age_max != null) {
    const min = filters.follower_age_min ?? 0;
    const max = filters.follower_age_max ?? Infinity;

    results = results.filter((c) =>
      c.audience_ages.some((a) => {
        const [lower] = a.age.replace("+", "").split("-").map(Number);
        return lower >= min && lower <= max && a.percentage >= 20;
      }),
    );
  }

  results.sort((a, b) => b.followers - a.followers);
  return results;
}
