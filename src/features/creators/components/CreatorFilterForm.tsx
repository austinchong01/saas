"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// ── Constants ────────────────────────────────────────────────────────────────

const LANGUAGES = [
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

const COUNTRY_CODES = [
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

const CONTENT_LABELS = [
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

const FOLLOWER_GENDER_RATIOS = [
  "FEMALE_50",
  "FEMALE_60",
  "FEMALE_70",
  "MALE_50",
  "MALE_60",
  "MALE_70",
] as const;

const FOLLOWER_AGES = ["18-24", "25-34", "35-44", "45-54", "55+"] as const;

const GENDER_RATIO_LABELS: Record<
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

// ── Schema ───────────────────────────────────────────────────────────────────

const optionalNonNegativeInt = z.preprocess(
  (v) => (v === "" || v == null ? undefined : Number(v)),
  z.number().int().min(0).optional(),
) as z.ZodType<number | undefined>;

const optionalRate = z.preprocess(
  (v) => (v === "" || v == null ? undefined : Number(v)),
  z.number().min(0).max(1).optional(),
) as z.ZodType<number | undefined>;

export const creatorFilterSchema = z
  .object({
    keyword: z.string().optional(),
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
    { message: "Min must be ≤ max", path: ["followersMax"] },
  )
  .refine(
    (d) =>
      d.medianViewsMin == null ||
      d.medianViewsMax == null ||
      d.medianViewsMin <= d.medianViewsMax,
    { message: "Min must be ≤ max", path: ["medianViewsMax"] },
  )
  .refine(
    (d) =>
      d.engagementRateMin == null ||
      d.engagementRateMax == null ||
      d.engagementRateMin <= d.engagementRateMax,
    { message: "Min must be ≤ max", path: ["engagementRateMax"] },
  );

export type CreatorFilterFormValues = z.infer<typeof creatorFilterSchema>;

// ── Multi-toggle helper ───────────────────────────────────────────────────────

function MultiToggle<T extends string>({
  options,
  value,
  onChange,
  getLabel,
}: {
  options: readonly T[];
  value: T[] | undefined;
  onChange: (next: T[]) => void;
  getLabel?: (option: T) => string;
}) {
  function toggle(option: T) {
    const current = value ?? [];
    const next = current.includes(option)
      ? current.filter((v) => v !== option)
      : [...current, option];
    onChange(next);
  }

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <Button
          key={option}
          type="button"
          variant={value?.includes(option) ? "default" : "outline"}
          size="sm"
          onClick={() => toggle(option)}
        >
          {getLabel ? getLabel(option) : option}
        </Button>
      ))}
    </div>
  );
}

// ── Range input helper ────────────────────────────────────────────────────────

function RangeFields({
  minName,
  maxName,
  control,
  label,
  placeholder,
  step,
}: {
  minName: string;
  maxName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  label: string;
  placeholder?: { min?: string; max?: string };
  step?: string;
}) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">{label}</p>
      <div className="flex items-start gap-3">
        <FormField
          control={control}
          name={minName}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className="text-xs text-muted-foreground">
                Min
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step={step}
                  placeholder={placeholder?.min ?? "No min"}
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={maxName}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className="text-xs text-muted-foreground">
                Max
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step={step}
                  placeholder={placeholder?.max ?? "No max"}
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

// ── Form component ────────────────────────────────────────────────────────────

type CreatorFilterFormProps = {
  onSubmit: (values: CreatorFilterFormValues) => void;
  defaultValues?: Partial<CreatorFilterFormValues>;
};

export function CreatorFilterForm({
  onSubmit,
  defaultValues,
}: CreatorFilterFormProps) {
  const form = useForm<CreatorFilterFormValues>({
    resolver: zodResolver(creatorFilterSchema),
    defaultValues: {
      keyword: "",
      languages: [],
      followerCountryCodes: [],
      countryCodes: [],
      contentLabels: [],
      followerGenderRatio: [],
      followerAge: [],
      ...defaultValues,
    },
  });

  return (
    <div className="container my-4 max-w-5xl">
      <h1 className="text-3xl md:text-4xl lg:text-5xl mb-4">
        Welcome to Creator Hub
      </h1>
      <p className="text-muted-foreground mb-8">
        To get started, try adjusting the filters related to the creator/(s)
        you&apos;re interested in. The most popular creators will be displayed
        first.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardContent className={cn("p-6 space-y-8")}>
              {/* Followers */}
              <RangeFields
                control={form.control}
                label="Followers"
                minName="followersMin"
                maxName="followersMax"
                placeholder={{ min: "e.g. 10000", max: "e.g. 1000000" }}
              />

              {/* Median Views */}
              <RangeFields
                control={form.control}
                label="Median Views"
                minName="medianViewsMin"
                maxName="medianViewsMax"
                placeholder={{ min: "e.g. 5000", max: "e.g. 500000" }}
              />

              {/* Engagement Rate */}
              <RangeFields
                control={form.control}
                label="Engagement Rate (0 – 1)"
                minName="engagementRateMin"
                maxName="engagementRateMax"
                step="0.01"
                placeholder={{ min: "e.g. 0.02", max: "e.g. 0.15" }}
              />

              {/* Content Labels */}
              <FormField
                control={form.control}
                name="contentLabels"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content Type</FormLabel>
                    <FormControl>
                      <MultiToggle
                        options={CONTENT_LABELS}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Languages */}
              <FormField
                control={form.control}
                name="languages"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Languages</FormLabel>
                    <FormControl>
                      <MultiToggle
                        options={LANGUAGES}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Creator Country */}
              <FormField
                control={form.control}
                name="countryCodes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Creator Country</FormLabel>
                    <FormControl>
                      <MultiToggle
                        options={COUNTRY_CODES}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Follower Country */}
              <FormField
                control={form.control}
                name="followerCountryCodes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Audience Country</FormLabel>
                    <FormControl>
                      <MultiToggle
                        options={COUNTRY_CODES}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Follower Gender Ratio */}
              <FormField
                control={form.control}
                name="followerGenderRatio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Audience Gender Ratio</FormLabel>
                    <FormControl>
                      <MultiToggle
                        options={FOLLOWER_GENDER_RATIOS}
                        value={field.value}
                        onChange={field.onChange}
                        getLabel={(option) => GENDER_RATIO_LABELS[option]}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Follower Age */}
              <FormField
                control={form.control}
                name="followerAge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Audience Age</FormLabel>
                    <FormControl>
                      <MultiToggle
                        options={FOLLOWER_AGES}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Keyword */}
              <FormField
                control={form.control}
                name="keyword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Keyword</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. outdoor adventure, street food..."
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button type="submit">Apply Filters</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
