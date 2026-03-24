import { CreatorFilterFormValues } from "./schemas";

export function filtersToSearchParams(
  filters: CreatorFilterFormValues,
): string {
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

export function searchParamsToFilters(
  params: Record<string, string | string[]>,
): Partial<CreatorFilterFormValues> {
  
  const get = (key: string): string | undefined => {
    const val = params[key];
    if (Array.isArray(val)) return val[0];
    return val;
  };

  return {
    followersMin:
      get("followersMin") != null ? Number(get("followersMin")) : undefined,
    followersMax:
      get("followersMax") != null ? Number(get("followersMax")) : undefined,
    medianViewsMin:
      get("medianViewsMin") != null ? Number(get("medianViewsMin")) : undefined,
    medianViewsMax:
      get("medianViewsMax") != null ? Number(get("medianViewsMax")) : undefined,
    engagementRateMin:
      get("engagementRateMin") != null
        ? Number(get("engagementRateMin"))
        : undefined,
    engagementRateMax:
      get("engagementRateMax") != null
        ? Number(get("engagementRateMax"))
        : undefined,
    contentLabels: get("contentLabels")?.split(",") as any,
    languages: get("languages")?.split(",") as any,
    countryCodes: get("countryCodes")?.split(",") as any,
    followerCountryCodes: get("followerCountryCodes")?.split(",") as any,
    followerGenderRatio: get("followerGenderRatio")?.split(",") as any,
    followerAge: get("followerAge")?.split(",") as any,
  };
}
