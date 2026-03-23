export const LANGUAGES = [
  "ar",
  "de",
  "en",
  "es",
  "fr",
  "id",
  "it",
  "ja",
  "ko",
  "ms",
  "pt",
  "th",
  "tl",
  "tr",
  "vi",
] as const;

export const COUNTRY_CODES = [
  "AE",
  "AU",
  "BR",
  "CA",
  "DE",
  "EG",
  "ES",
  "FR",
  "GB",
  "ID",
  "IL",
  "IT",
  "JP",
  "KR",
  "MY",
  "PH",
  "RU",
  "SA",
  "SG",
  "TH",
  "TR",
  "TW",
  "US",
  "VN",
] as const;

export const CONTENT_LABELS = [
  "beauty",
  "fitness",
  "gaming",
  "fashion",
  "food",
  "travel",
  "tech",
  "music",
  "sports",
  "education",
  "lifestyle",
  "comedy",
  "art",
  "business",
  "health",
] as const;

export const FOLLOWER_GENDER_RATIOS = [
  "FEMALE_50",
  "FEMALE_60",
  "FEMALE_70",
  "MALE_50",
  "MALE_60",
  "MALE_70",
] as const;

export const FOLLOWER_AGES = [
  "18-24",
  "25-34",
  "35-44",
  "45-54",
  "55+",
] as const;

export const GENDER_RATIO_LABELS: Record<
  (typeof FOLLOWER_GENDER_RATIOS)[number],
  string
> = {
  FEMALE_50: "50%+ Female",
  FEMALE_60: "60%+ Female",
  FEMALE_70: "70%+ Female",
  MALE_50: "50%+ Male",
  MALE_60: "60%+ Male",
  MALE_70: "70%+ Male",
};
