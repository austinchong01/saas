import { writeFileSync } from "fs";
const { TT_APP_ID, AUTH_CODE, TT_SECRET, TT_ACCESS_TOKEN, TTO_ACC_ID } = process.env;

const HANDLE_NAME = "aweston.live"; // USERNAME TEST

// Step 1: access token
// const tokenRes = await fetch(
//   "https://business-api.tiktok.com/open_api/v1.3/oauth2/access_token/",
//   {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       app_id: TT_APP_ID,
//       auth_code: AUTH_CODE,
//       secret: TT_SECRET,
//     }),
//   },
// );

// const tokenJson = await tokenRes.json();
// if (tokenJson.code !== 0) {
//   console.error("Token request failed:", tokenJson);
//   process.exit(1);
// }

// const accessToken = tokenJson.data;
// console.log("Access token:", accessToken);

const ad_ids = ['7576387230785142785'];
const scope = [18020000, 13020000, 18010000, 14020000, 14010000];

// check advertiser accounts that can be access w/ current access token
// const advertiserUrl = new URL(
//   "https://business-api.tiktok.com/open_api/v1.3/tto/oauth2/tcm/",
// );
// advertiserUrl.searchParams.set("app_id", TT_APP_ID);
// advertiserUrl.searchParams.set("secret", TT_SECRET);
// const tcmRes = await fetch(advertiserUrl, {
//   method: "GET",
//   headers: { "Access-Token": TT_ACCESS_TOKEN },
// });
// const authJSON = await tcmRes.json();
// if (authJSON.code !== 0) {
//   console.error("Authorized Accounts Check request failed:", authJSON);
//   process.exit(1);
// }

// console.log("Authorized Accounts:", authJSON);
// const tto_tcm_account_ids = ['7632039214632484865'];



// GET LIST OF CREATORS FROM FILTERS
const creatorUrl = new URL(
  "https://business-api.tiktok.com/open_api/v1.3/tto/tcm/creator/discover/",
);
creatorUrl.searchParams.set("tto_tcm_account_id", TTO_ACC_ID);

creatorUrl.searchParams.set("country_codes", JSON.stringify(["US"])); // can only choose one region

creatorUrl.searchParams.set("content_label_ids", JSON.stringify(["11002002"])); // Beauty Tutorials & Tips CONTENT!!!!
creatorUrl.searchParams.set("industry_label_ids", JSON.stringify(["14000000000"])); // Beauty & Personal Care CONTENT!!!!

creatorUrl.searchParams.set("languages", JSON.stringify(["en", "ko"]));
// creatorUrl.searchParams.set("min_median_views", 5000);


creatorUrl.searchParams.set("min_followers", 100000);
// creatorUrl.searchParams.set("max_followers", 10000);

creatorUrl.searchParams.set("follower_country_codes", JSON.stringify(["US", "KR"]));
creatorUrl.searchParams.set("follower_gender_ratio", "FEMALE_50");
creatorUrl.searchParams.set("follower_age", "25-34");

creatorUrl.searchParams.set("sort_field", "RELEVANCE");
creatorUrl.searchParams.set("sort_order", "DESC");
creatorUrl.searchParams.set("page_size", 10);


const creatorRes = await fetch(creatorUrl, {
  method: "GET",
  headers: { "Access-Token": TT_ACCESS_TOKEN },
});

const creatorData = await creatorRes.json();
writeFileSync("z_creators_output.json", JSON.stringify(creatorData, null, 2));
console.log("Written to z_creators_output.json");



// SINGLE CREATOR LOOKUP
// const creatorUrl = new URL(
//   "https://business-api.tiktok.com/open_api/v1.3/tto/tcm/creator/public/",
// );
// creatorUrl.searchParams.set("tto_tcm_account_id", TTO_ACC_ID);
// creatorUrl.searchParams.set("handle_name", HANDLE_NAME);
// // console.log(creatorUrl.toString());

// const creatorRes = await fetch(creatorUrl, {
//   method: "GET",
//   headers: { "Access-Token": TT_ACCESS_TOKEN },
// });

// const creatorData = await creatorRes.json();
// writeFileSync("z_creator_output.json", JSON.stringify(creatorData, null, 2));
// console.log("Written to z_creator_output.json");


// LABEL LOOKUP
// const creatorUrl = new URL(
//   "https://business-api.tiktok.com/open_api/v1.3/tto/tcm/category/label/",
// );
// creatorUrl.searchParams.set("tto_tcm_account_id", TTO_ACC_ID);
// creatorUrl.searchParams.set("label_type", "SEARCH");

// const creatorRes = await fetch(creatorUrl, {
//   method: "GET",
//   headers: { "Access-Token": TT_ACCESS_TOKEN },
// });

// const creatorData = await creatorRes.json();
// writeFileSync("z_label_output.json", JSON.stringify(creatorData, null, 2));
// console.log("Written to label_output.json");