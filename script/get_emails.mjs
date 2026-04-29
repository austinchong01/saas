import { writeFileSync } from "fs";
const { TT_APP_ID, AUTH_CODE, TT_SECRET, TT_ACCESS_TOKEN, TTO_ACC_ID } =
  process.env;

// const HANDLE_NAME = "lydia.chae"; // USERNAME TEST

// GET LIST OF CREATORS FROM FILTERS
const creatorListREQ = new URL(
  "https://business-api.tiktok.com/open_api/v1.3/tto/tcm/creator/discover/",
);
creatorListREQ.searchParams.set("tto_tcm_account_id", TTO_ACC_ID);

creatorListREQ.searchParams.set("country_codes", JSON.stringify(["US"])); // can only choose one region

creatorListREQ.searchParams.set(
  "content_label_ids",
  JSON.stringify(["11002", "11002002"]),
);
// creatorListREQ.searchParams.set("industry_label_ids", JSON.stringify(["14000000000"]));

creatorListREQ.searchParams.set("languages", JSON.stringify(["en", "ko"]));
// creatorListREQ.searchParams.set("min_median_views", 5000);

creatorListREQ.searchParams.set("min_followers", 1000);
creatorListREQ.searchParams.set("max_followers", 15000);

creatorListREQ.searchParams.set(
  "follower_country_codes",
  JSON.stringify(["US", "KR"]),
);
// creatorListREQ.searchParams.set("follower_gender_ratio", "FEMALE_60");
creatorListREQ.searchParams.set("follower_age", "18-24");

creatorListREQ.searchParams.set("sort_field", "RELEVANCE");
creatorListREQ.searchParams.set("sort_order", "DESC");
// creatorListREQ.searchParams.set("page_size", 10);

const creatorList_TT = await fetch(creatorListREQ, {
  method: "GET",
  headers: { "Access-Token": TT_ACCESS_TOKEN },
});

const creatorList = await creatorList_TT.json();
// console.log(creatorList.data);
// writeFileSync("z_creators_output.json", JSON.stringify(creatorList, null, 2));
// console.log("Written to z_creators_output.json");

// now loop through list of creators and get their emails
const creatorEmails = [];
for (const creator of creatorList.data?.creators || []) {

  const creatorUrl = new URL(
    "https://business-api.tiktok.com/open_api/v1.3/tto/tcm/creator/public/",
  );
  creatorUrl.searchParams.set("tto_tcm_account_id", TTO_ACC_ID);
  creatorUrl.searchParams.set("handle_name", creator.handle_name);
  const creatorRes = await fetch(creatorUrl, {
    method: "GET",
    headers: { "Access-Token": TT_ACCESS_TOKEN },
  });
  const creatorData = await creatorRes.json();
  console.log(creatorData);

  const email = email_parse(creatorData.data.bio);
  if (email) {
    console.log("found email");
    creatorEmails.push({
      handle_name: creator.handle_name,
      email,
    });
  } else {
    // console.log("no email found", creator.data.bio);
  }
}

writeFileSync("z_creator_emails.json", JSON.stringify(creatorEmails, null, 2));
console.log("Written to test2_creator_emails.json");

function email_parse(bio) {
  const match = bio.match(/[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/);
  return match ? match[0] : null;
}
