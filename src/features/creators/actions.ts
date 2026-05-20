"use server";

import { getCreatorIdTag, getCreatorsByFiltersTag } from "./cache";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { CreatorFilterFormValues, creatorFilterSchema } from "./schemas";
import { getCurrentUser } from "@/services/clerk/lib/getCurrentUser";
import { env } from "../../data/env/server";
import { setIfDefined, setArrayIfDefined } from "./helpers";
import { CONTENT_LABEL_IDS } from "./constants";
// import { mock_creators, mock_creator } from "./mock_data";

export async function getCreator(creatorId: string) {
  "use cache";
  cacheTag(getCreatorIdTag(creatorId));
  console.log("getOneCreator CACHE MISS");

  // return mock_creator; // MOCK DATA

  const creatorUrl = new URL(
    "https://business-api.tiktok.com/open_api/v1.3/tto/tcm/creator/public/",
  );
  creatorUrl.searchParams.set("tto_tcm_account_id", env.TT_ACC_ID);
  creatorUrl.searchParams.set("handle_name", creatorId);

  const creatorRes = await fetch(creatorUrl, {
    method: "GET",
    headers: { "Access-Token": env.TT_ACCESS_TOKEN },
  });

  const creatorData = await creatorRes.json();

  if (creatorData.message !== "OK") {
    return { error: true, message: `Failed to fetch creator: ${creatorData.message}` };
  }

  // console.log(creatorData.data);
  return creatorData.data;
}

export async function getCreatorsByFilters(
  filters: CreatorFilterFormValues,
) {
  "use cache";
  cacheTag(getCreatorsByFiltersTag(filters));
  console.log("getCreators CACHE MISS");

  // return mock_creators; // MOCK DATA

  const creatorListURL = new URL(
    "https://business-api.tiktok.com/open_api/v1.3/tto/tcm/creator/discover/",
  );
  const params = creatorListURL.searchParams;

  // map content labels to ids
  const labelIds = filters.contentLabels?.map(name => CONTENT_LABEL_IDS[name]);

  // REQUIRED PARAMS
  params.set("tto_tcm_account_id", env.TT_ACC_ID);
  params.set(
    "country_codes",
    JSON.stringify([filters.countryCode]),
  );

  setIfDefined(params, "min_followers", filters.followersMin);
  setIfDefined(params, "max_followers", filters.followersMax);
  setIfDefined(params, "min_median_views", filters.medianViewsMin);
  setIfDefined(params, "max_median_views", filters.medianViewsMax);
  setIfDefined(params, "min_engagement_rate", filters.engagementRateMin);
  setIfDefined(params, "max_engagement_rate", filters.engagementRateMax);
  setIfDefined(params, "follower_age", filters.followerAge);
  setIfDefined(params, "follower_gender_ratio", filters.followerGenderRatio);
  // keyword search?

  setArrayIfDefined(params, "languages", filters.languages);
  setArrayIfDefined(params, "content_label_ids", labelIds);
  setArrayIfDefined(params, "follower_country_codes", filters.followerCountryCodes);
  // industry labels?

  params.set("sort_field", "RELEVANCE");
  params.set("sort_order", "DESC");
  params.set("page", "1");
  params.set("page_size", "10"); 


  // console.log(decodeURIComponent(creatorListURL.toString()));


  const creatorListRES = await fetch(creatorListURL, {
    method: "GET",
    headers: { "Access-Token": env.TT_ACCESS_TOKEN },
  });
  const creatorList = await creatorListRES.json();
  if (creatorList.message !== "OK")
    return { error: true, message: `Failed to fetch creator list: ${creatorList.message}` };

  if (!creatorList.data.creators)
    return { error: true, message: "No creators found matching those filters." };
  
  return creatorList.data.creators;
}

export async function checkFilterInfo(
  unsafeData: Partial<CreatorFilterFormValues>,
) {
  const { userId } = await getCurrentUser();
  if (userId == null) {
    return {
      error: true,
      message: "You do not have permission to do this.",
    };
  }

  const { success, data } = creatorFilterSchema.safeParse(unsafeData);

  if (!success) {
    return { error: true, message: "Invalid filter data." };
  }
  return data;
}
