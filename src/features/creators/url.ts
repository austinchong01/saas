import { CreatorFilterFormValues, creatorFilterSchema } from "./schemas";

export function filtersToSearchParams(
  filters: Partial<CreatorFilterFormValues>,
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

export function searchParamsToFilters(params: Record<string, string>): {
  data: Partial<CreatorFilterFormValues>;
  error: string | null;
} {
  const get = (key: string): string | undefined => {
    const val = params[key];
    if (Array.isArray(val)) return val[0];
    return val;
  };

  const result: Partial<Record<keyof CreatorFilterFormValues, unknown>> = {};

  if (get("followersMin") != null)
    result.followersMin = Number(get("followersMin"));
  if (get("followersMax") != null)
    result.followersMax = Number(get("followersMax"));
  if (get("medianViewsMin") != null)
    result.medianViewsMin = Number(get("medianViewsMin"));
  if (get("medianViewsMax") != null)
    result.medianViewsMax = Number(get("medianViewsMax"));
  if (get("engagementRateMin") != null)
    result.engagementRateMin = Number(get("engagementRateMin"));
  if (get("engagementRateMax") != null)
    result.engagementRateMax = Number(get("engagementRateMax"));
  if (get("contentLabels"))
    result.contentLabels = get("contentLabels")!.split(",");
  if (get("languages")) result.languages = get("languages")!.split(",");
  if (get("countryCode")) result.countryCode = get("countryCode");
  if (get("followerCountryCodes"))
    result.followerCountryCodes = get("followerCountryCodes")!.split(",");
  if (get("followerGenderRatio"))
    result.followerGenderRatio = get("followerGenderRatio");
  if (get("followerAge")) result.followerAge = get("followerAge");

  const parsed = creatorFilterSchema.safeParse(result);
  if (!parsed.success) {
    return { data: {}, error: "Invalid filter parameters in URL" };
  }

  return { data: parsed.data, error: null };
}
