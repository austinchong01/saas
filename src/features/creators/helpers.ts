import { CreatorFilterFormValues, creatorFilterSchema } from "./schemas";
import { z } from "zod";

const defaultFilters: z.infer<typeof creatorFilterSchema> = {
  languages: [],
  followerCountryCodes: [],
  countryCode: "US",
  contentLabels: [],
  followerGenderRatio: "",
  followerAge: "",
  followersMin: "",
  followersMax: "",
  medianViewsMin: "",
  medianViewsMax: "",
  engagementRateMin: "",
  engagementRateMax: "",
};

export function filtersToSearchParams(
  filters: Partial<CreatorFilterFormValues>,
): string {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(filters)) {
    if (key === "page" && value === 1) continue;
    if (value == "") continue;
    if (Array.isArray(value) && value.length == 0) continue;
    if (Array.isArray(value)) {
      params.set(key, value.join(","));
    } else {
      params.set(key, String(value));
    }
  }

  return params.toString();
}

export function searchParamsToFilters(params: Record<string, string>): {
  data: CreatorFilterFormValues;
  error: string | null;
} {
  const get = (key: string): string | undefined => {
    const val = params[key];
    if (Array.isArray(val)) return val[0];
    return val;
  };

  const getArray = (key: string): string[] => {
    const val = get(key);
    return val ? val.split(",") : [];
  };

  const result = {
    followersMin: get("followersMin") ?? "",
    followersMax: get("followersMax") ?? "",
    medianViewsMin: get("medianViewsMin") ?? "",
    medianViewsMax: get("medianViewsMax") ?? "",
    engagementRateMin: get("engagementRateMin") ?? "",
    engagementRateMax: get("engagementRateMax") ?? "",
    contentLabels: getArray("contentLabels"),
    languages: getArray("languages"),
    countryCode: get("countryCode") ?? "US",
    followerCountryCodes: getArray("followerCountryCodes"),
    followerGenderRatio: get("followerGenderRatio") ?? "",
    followerAge: get("followerAge") ?? "",
    page: Number(get("page") ?? 1),
  };

  const parsed = creatorFilterSchema.safeParse(result);
  // console.log(parsed)
  if (!parsed.success) {
    console.log(parsed.error.issues);
    return { data: { ...defaultFilters, page: 1 }, error: "Invalid filter parameters in URL" };
  }

  return { data: { ...parsed.data, page: result.page }, error: null };
}

export function setIfDefined(
  params: URLSearchParams,
  key: string,
  value: unknown,
) {
  if (value == null) return;
  params.set(key, String(value));
}

export function setArrayIfDefined(
  params: URLSearchParams,
  key: string,
  value: unknown[] | undefined,
) {
  if (!value || value.length === 0) return;
  params.set(key, JSON.stringify(value));
}
