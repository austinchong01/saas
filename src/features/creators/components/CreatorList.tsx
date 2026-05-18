import { getCreatorsByFilters } from "@/features/creators/actions";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/CreatorCard";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Heart,
  Users,
  Video,
  Languages,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { filtersToSearchParams, searchParamsToFilters } from "../helpers";
import {
  COUNTRY_LABELS,
  LANGUAGE_LABELS,
  GENDER_RATIO_LABELS,
} from "../constants";
import { CreatorFilterFormValues } from "../schemas";
import Link from "next/link";
import { formatCount } from "@/lib/utils";
import { CreatorSearchInput } from "./CreatorSearchInput";

export async function CreatorList({
  searchParams = {},
}: {
  searchParams?: Record<string, string>;
}) {
  const { data: filters, error } = searchParamsToFilters(searchParams); // error on invalid param filters
  const url = filtersToSearchParams(filters);

  const creators = await getCreatorsByFilters(filters);

  if ("error" in creators) {
    if (creators.message === "No creators found matching those filters.")
      return <NoCreatorsFound url={url} filters={filters} />;
    else return <div>{creators.message}</div>;
  }
  return <CreatorsFound creators={creators} url={url} filters={filters} />;
}

function NoCreatorsFound({
  url,
  filters,
}: {
  url: string;
  filters: CreatorFilterFormValues;
}) {
  return (
    <div className="container my-4 max-w-5xl">
      <h1 className="text-3xl md:text-4xl lg:text-5xl mb-4">
        No Creators Found
      </h1>

      <p className="text-muted-foreground mb-8">
        Try adjusting the filters related to the creator/(s) you are interested
        in. The most relevant creators will be displayed first.
      </p>
      <FilterBadges filters={filters} />
      <Button asChild>
        <Link href={`/app?${url}`}>Edit Filters</Link>
      </Button>
    </div>
  );
}

export function FilterBadges({
  filters,
}: {
  filters: CreatorFilterFormValues;
}) {
  const chips: { label: string; value: string }[] = [];

  // REQUIRED country code parameter
  chips.push({
    label: "Country",
    value: COUNTRY_LABELS[filters.countryCode],
  });

  if (filters.followersMin !== "" || filters.followersMax !== "") {
    const min = filters.followersMin ? formatCount(filters.followersMin) : "";
    const max = filters.followersMax ? formatCount(filters.followersMax) : "";
    chips.push({
      label: "Followers",
      value: min && max ? `${min}–${max}` : min ? `${min}+` : `≤${max}`,
    });
  }

  if (filters.medianViewsMin !== "" || filters.medianViewsMax !== "") {
    const min =
      filters.medianViewsMin !== "" ? formatCount(filters.medianViewsMin) : "";
    const max =
      filters.medianViewsMax !== "" ? formatCount(filters.medianViewsMax) : "";
    chips.push({
      label: "Median views",
      value: min && max ? `${min}–${max}` : min ? `${min}+` : `≤${max}`,
    });
  }

  if (filters.engagementRateMin !== "" || filters.engagementRateMax !== "") {
    const min =
      filters.engagementRateMin !== ""
        ? `${(filters.engagementRateMin * 100).toFixed(1)}%`
        : "";
    const max =
      filters.engagementRateMax !== ""
        ? `${(filters.engagementRateMax * 100).toFixed(1)}%`
        : "";
    chips.push({
      label: "Engagement",
      value: min && max ? `${min}–${max}` : min ? `${min}+` : `≤${max}`,
    });
  }

  if (filters.contentLabels.length > 0) {
    chips.push({ label: "Content", value: filters.contentLabels.join(", ") });
  }
  if (filters.languages.length > 0) {
    chips.push({
      label: "Language",
      value: filters.languages.map((lang) => LANGUAGE_LABELS[lang]).join(", "),
    });
  }
  if (filters.followerCountryCodes.length > 0) {
    chips.push({
      label: "Audience Country",
      value: filters.followerCountryCodes
        .map((code) => COUNTRY_LABELS[code])
        .join(", "),
    });
  }

  if (filters.followerGenderRatio !== "") {
    chips.push({
      label: "Audience Gender",
      value: GENDER_RATIO_LABELS[filters.followerGenderRatio],
    });
  }
  if (filters.followerAge !== "") {
    chips.push({ label: "Audience Age", value: filters.followerAge });
  }

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 py-2">
      {chips.map(({ label, value }) => (
        <Badge key={label} variant="secondary">
          <span className="font-semibold">{label}:</span>
          <span className="font-normal ml-1">{value}</span>
        </Badge>
      ))}
    </div>
  );
}

function CreatorsFound({
  creators,
  url,
  filters,
}: {
  creators: any[];
  url: string;
  filters: CreatorFilterFormValues;
}) {
  return (
    <div className="container my-4 max-w-5xl">
      <div className="grid gap-4">
        {/* <Input placeholder="Search creators..." value={""} /> */}
        <FilterBadges filters={filters} />
        <Button asChild>
          <Link href={`/app?${url}`}>Edit Filters</Link>
        </Button>
        <CreatorSearchInput backUrl={url} />
        {creators.map((creator) => (
          <Card key={creator.handle_name} className="">
            <CardHeader>
              <div className="flex flex-0 gap-4 items-center">
                <Avatar size="lg">
                  <AvatarImage
                    src={creator.profile_image}
                    alt={creator.display_name}
                  />
                  <AvatarFallback>
                    {creator.display_name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{creator.display_name}</CardTitle>
                  <CardDescription>@{creator.handle_name}</CardDescription>
                </div>
                {/* <div>
                  {creator.is_verified && (
                    <BadgeCheck className="size-6 text-blue-500" />
                  )}
                </div> */}
              </div>


            </CardHeader>

            <CardContent className="flex items-center justify-center">
              <div className="grid grid-cols-2 gap-6 text-sm">
                <div className="flex items-center gap-2 h-5 w-56">
                  <Users className="size-4 text-muted-foreground" />
                  <span>{formatCount(creator.followers_count)} followers</span>
                </div>
                <div className="flex items-center gap-2 h-5 w-56">
                  <Heart className="size-4 text-muted-foreground" />
                  <span className="nowraptext">
                    {formatCount(creator.likes_count)} likes
                  </span>
                </div>
                <div className="flex items-center gap-2 h-5 w-56">
                  <Video className="size-4 text-muted-foreground" />
                  <span>{formatCount(creator.videos_count)} videos</span>
                </div>
                <Button variant="outline" size="sm" asChild className="w-20">
                  <Link
                    href={`/app/creators/${creator.handle_name}?back=${encodeURIComponent(`/app/creators?${url}`)}`}
                  >
                    Profile
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
