"use client";

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
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CreatorFilterFormValues, creatorFilterSchema } from "../schemas";
import {
  CONTENT_LABELS,
  COUNTRY_CODES,
  FOLLOWER_AGES,
  FOLLOWER_GENDER_RATIOS,
  LANGUAGES,
  GENDER_RATIO_LABELS,
  LANGUAGE_LABELS,
  COUNTRY_LABELS
} from "../constants";
import { RangeFields } from "./RangeSelect";
import { MultiToggle } from "./MultiSelect";

type CreatorFilterFormProps = {
  onSubmit: (values: CreatorFilterFormValues) => void;
  defaultValues?: Partial<CreatorFilterFormValues>;
};

export function CreatorFilterForm({ onSubmit }: CreatorFilterFormProps) {
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
      followersMin: 10000,
    },
  });

  return (
    <div className="container my-4 max-w-5xl">
      <h1 className="text-3xl md:text-4xl lg:text-5xl mb-4">
        Welcome to Creator Hub
      </h1>
      <p className="text-muted-foreground mb-8">
        To get started, try adjusting the filters related to the creator/(s) you
        are interested in. The most relevant creators will be displayed first.
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
                step={10000}
              />

              {/* Median Views */}
              <RangeFields
                control={form.control}
                label="Median Views"
                minName="medianViewsMin"
                maxName="medianViewsMax"
                placeholder={{ min: "e.g. 5000", max: "e.g. 500000" }}
                step={1000}
              />

              {/* Engagement Rate */}
              <RangeFields
                control={form.control}
                label="Engagement Rate (0 – 1)"
                minName="engagementRateMin"
                maxName="engagementRateMax"
                step={0.1}
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
                        getLabel={(option) => LANGUAGE_LABELS[option]}
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
                        // getLabel={(option) => COUNTRY_LABELS[option]}
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
                        // getLabel={(option) => COUNTRY_LABELS[option]}
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
              {/* <FormField
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
              /> */}

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
