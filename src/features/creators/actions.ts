"use server";

import { getCreatorIdTag } from "./cache";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import mockCreators from "@/data/mock/creators.json";
import { CreatorFilterFormValues, creatorFilterSchema } from "./schemas";
import { getCurrentUser } from "@/services/clerk/lib/getCurrentUser";
import { filtersToSearchParams } from "./url";
import { env } from "../../data/env/server";

export async function getCreator(creatorId: string) {
  "use cache";
  cacheTag(getCreatorIdTag(creatorId));

  // TODO: Replace with TikTok API call once approved
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

  if (!creatorData.success) {
    console.log("Failed to fetch creator data:", creatorData.message);
    return null;
  }
  console.log(creatorData.data);
  return;
  
  // return creatorData.data;
}

export async function getCreatorsByFilters(
  filters: Partial<CreatorFilterFormValues>,
) {
  let results = [...mockCreators];
  console.log(filters);

  const creatorListURL = new URL(
    "https://business-api.tiktok.com/open_api/v1.3/tto/tcm/creator/discover/",
  );
  creatorListURL.searchParams.set("tto_tcm_account_id", env.TT_ACC_ID);

  creatorListURL.searchParams.set("country_codes", JSON.stringify(["US"])); // can only choose one region

  creatorListURL.searchParams.set("content_label_ids", JSON.stringify(["11002", "11002002"]));
  // creatorListURL.searchParams.set("industry_label_ids", JSON.stringify(["14000000000"]));

  creatorListURL.searchParams.set("languages", JSON.stringify(["en", "ko"]));
  // creatorListURL.searchParams.set("min_median_views", 5000);

  creatorListURL.searchParams.set("min_followers", 1000);
  creatorListURL.searchParams.set("max_followers", 15000);

  creatorListURL.searchParams.set("follower_country_codes", JSON.stringify(["US", "KR"]));
  // creatorListURL.searchParams.set("follower_gender_ratio", "FEMALE_60");
  creatorListURL.searchParams.set("follower_age", "18-24");

  creatorListURL.searchParams.set("sort_field", "RELEVANCE");
  creatorListURL.searchParams.set("sort_order", "DESC");
  // creatorListURL.searchParams.set("page_size", 10);

  const creatorListRES = await fetch(creatorListURL, {
    method: "GET",
    headers: { "Access-Token": env.TT_ACCESS_TOKEN },
  });

  const creatorList = await creatorListRES.json();
  console.log(creatorList.data);

  return results;
}

export async function checkFilterInfo(unsafeData: CreatorFilterFormValues) {
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

  const id = filtersToSearchParams(data);
  return id;
}
