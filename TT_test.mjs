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

// Step 2: TCM account IDs
// const tcmUrl = new URL(
//   "https://business-api.tiktok.com/open_api/v1.3/tto/oauth2/tcm/",
// );
// tcmUrl.searchParams.set("app_id", TT_APP_ID);
// tcmUrl.searchParams.set("secret", TT_SECRET);

// const tcmRes = await fetch(tcmUrl, {
//   method: "GET",
//   headers: { "Access-Token": accessToken },
// });

// const tcmJson = await tcmRes.json();
// if (tcmJson.code !== 0) {
//   console.error("TCM account request failed:", tcmJson);
//   process.exit(1);
// }

// console.log("TCM response:", tcmJson);

// const tcmAccountId = tcmJson.data?.tto_tcm_account_ids?.[0];
// if (!tcmAccountId) {
//   throw new Error("No tto_tcm_account_ids returned");
// }
// console.log("Using TCM account ID:", tcmAccountId);

// Step 3: creator lookup
const creatorUrl = new URL(
  "https://business-api.tiktok.com/open_api/v1.3/tto/tcm/creator/public/",
);
creatorUrl.searchParams.set("tto_tcm_account_id", TTO_ACC_ID);
creatorUrl.searchParams.set("handle_name", HANDLE_NAME);
// console.log(creatorUrl.toString());

const creatorRes = await fetch(creatorUrl, {
  method: "GET",
  headers: { "Access-Token": TT_ACCESS_TOKEN },
});

const creatorData = await creatorRes.json();
writeFileSync("creator_output.json", JSON.stringify(creatorData, null, 2));
console.log("Written to creator_output.json");
