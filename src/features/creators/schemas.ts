import { z } from "zod";
import {
  CONTENT_LABELS,
  COUNTRY_CODES,
  FOLLOWER_AGES,
  FOLLOWER_GENDER_RATIOS,
  LANGUAGES,
} from "./constants";

export const optionalNonNegativeInt = z.union([
  z.literal(""),
  z.coerce.number().int().min(0),
]);

export const optionalRate = z.union([
  z.literal(""),
  z.coerce.number().min(0).max(1),
]);

export type Creator = {
  handle_name: string;
  display_name: string;
  profile_image: string;
  followers_count: number;
  likes_count: number;
  videos_count: number;
};

export const creatorFilterSchema = z
  .object({
    // keyword: z.string().nullable(),
    followersMin: optionalNonNegativeInt,
    followersMax: optionalNonNegativeInt,
    medianViewsMin: optionalNonNegativeInt,
    medianViewsMax: optionalNonNegativeInt,
    engagementRateMin: optionalRate,
    engagementRateMax: optionalRate,
    languages: z.array(z.enum(LANGUAGES)),
    followerCountryCodes: z.array(z.enum(COUNTRY_CODES)),
    countryCode: z.enum(COUNTRY_CODES, {
      required_error: "Select a creator country",
    }),
    contentLabels: z.array(z.enum(CONTENT_LABELS)),
    followerGenderRatio: z.union([
      z.enum(FOLLOWER_GENDER_RATIOS),
      z.literal(""),
    ]),
    followerAge: z.union([z.enum(FOLLOWER_AGES), z.literal("")]),
  })
  .refine(
    (d) =>
      d.followersMin === "" ||
      d.followersMax === "" ||
      d.followersMin <= d.followersMax,
    { message: "min must be ≤ max", path: ["followersMax"] },
  )
  .refine(
    (d) =>
      d.medianViewsMin === "" ||
      d.medianViewsMax === "" ||
      d.medianViewsMin <= d.medianViewsMax,
    { message: "min must be ≤ max", path: ["medianViewsMax"] },
  )
  .refine(
    (d) =>
      d.engagementRateMin === "" ||
      d.engagementRateMax === "" ||
      d.engagementRateMin <= d.engagementRateMax,
    { message: "min must be ≤ max", path: ["engagementRateMax"] },
  );

export type CreatorFilterFormValues = z.infer<typeof creatorFilterSchema>;
