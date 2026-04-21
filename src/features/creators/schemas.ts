import { z } from "zod";
import {
  CONTENT_LABELS,
  COUNTRY_CODES,
  FOLLOWER_AGES,
  FOLLOWER_GENDER_RATIOS,
  LANGUAGES,
} from "./constants";

export const optionalNonNegativeInt = z.preprocess(
  (v) => (v === "" || v == null ? undefined : Number(v)),
  z.number().int().min(0).optional(),
) as z.ZodType<number | undefined>;

export const optionalRate = z.preprocess(
  (v) => (v === "" || v == null ? undefined : Number(v)),
  z.number().min(0).max(1).optional(),
) as z.ZodType<number | undefined>;

export const creatorFilterSchema = z
  .object({
    // keyword: z.string().nullable(),
    followersMin: optionalNonNegativeInt,
    followersMax: optionalNonNegativeInt,
    medianViewsMin: optionalNonNegativeInt,
    medianViewsMax: optionalNonNegativeInt,
    engagementRateMin: optionalRate,
    engagementRateMax: optionalRate,
    languages: z.array(z.enum(LANGUAGES)).optional(),
    followerCountryCodes: z.array(z.enum(COUNTRY_CODES)).optional(),
    countryCodes: z.array(z.enum(COUNTRY_CODES)).optional(),
    contentLabels: z.array(z.enum(CONTENT_LABELS)).optional(),
    followerGenderRatio: z.array(z.enum(FOLLOWER_GENDER_RATIOS)).optional(),
    followerAge: z.array(z.enum(FOLLOWER_AGES)).optional(),
  })
  .refine(
    (d) =>
      d.followersMin == null ||
      d.followersMax == null ||
      d.followersMin <= d.followersMax,
    { message: "min must be ≤ max", path: ["followersMax"] },
  )
  .refine(
    (d) =>
      d.medianViewsMin == null ||
      d.medianViewsMax == null ||
      d.medianViewsMin <= d.medianViewsMax,
    { message: "min must be ≤ max", path: ["medianViewsMax"] },
  )
  .refine(
    (d) =>
      d.engagementRateMin == null ||
      d.engagementRateMax == null ||
      d.engagementRateMin <= d.engagementRateMax,
    { message: "min must be ≤ max", path: ["engagementRateMax"] },
  );

export type CreatorFilterFormValues = z.infer<typeof creatorFilterSchema>;
