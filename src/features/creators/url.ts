import { CreatorFilterFormValues } from "./schemas";

export function filtersToSearchParams(filters: CreatorFilterFormValues): string {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(filters)) {
    if (value == null) continue;
    if (Array.isArray(value) && value.length === 0) continue;
    if (Array.isArray(value)) {
      params.set(key, value.join(","));
    } else {
      params.set(key, String(value));
    }
  }

  return params.toString();
}

export function searchParamsToFilters(params: URLSearchParams): Partial<CreatorFilterFormValues> {
  return {
    // keyword: params.get("keyword") ?? undefined,
    followersMin: params.has("followersMin") ? Number(params.get("followersMin")) : undefined,
    followersMax: params.has("followersMax") ? Number(params.get("followersMax")) : undefined,
    medianViewsMin: params.has("medianViewsMin") ? Number(params.get("medianViewsMin")) : undefined,
    medianViewsMax: params.has("medianViewsMax") ? Number(params.get("medianViewsMax")) : undefined,
    engagementRateMin: params.has("engagementRateMin") ? Number(params.get("engagementRateMin")) : undefined,
    engagementRateMax: params.has("engagementRateMax") ? Number(params.get("engagementRateMax")) : undefined,
    contentLabels: params.get("contentLabels")?.split(",") as any,
    languages: params.get("languages")?.split(",") as any,
    countryCodes: params.get("countryCodes")?.split(",") as any,
    followerCountryCodes: params.get("followerCountryCodes")?.split(",") as any,
    followerGenderRatio: params.get("followerGenderRatio")?.split(",") as any,
    followerAge: params.get("followerAge")?.split(",") as any,
  };
}