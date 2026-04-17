const { TT_APP_ID, AUTH_CODE, TT_SECRET } = process.env;
if (!TT_APP_ID || !AUTH_CODE || !TT_SECRET) {
  throw new Error("Missing TT_APP_ID, AUTH_CODE, or TT_SECRET");
}

const HANDLE_NAME = "aweston.live"; // USERNAME TEST

// Step 1: access token
const tokenRes = await fetch(
  "https://business-api.tiktok.com/open_api/v1.3/oauth2/access_token/",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      app_id: TT_APP_ID,
      auth_code: AUTH_CODE,
      secret: TT_SECRET,
    }),
  },
);

const tokenJson = await tokenRes.json();
if (tokenJson.code !== 0) {
  console.error("Token request failed:", tokenJson);
  process.exit(1);
}

const accessToken = tokenJson.data.access_token;
console.log("Access token:", accessToken);

// Step 2: TCM account IDs
const tcmRes = await fetch(
  "https://business-api.tiktok.com/open_api/v1.3/tto/oauth2/tcm/",
  {
    method: "GET",
    headers: { "Access-Token": accessToken },
  },
);

const tcmJson = await tcmRes.json();
if (tcmJson.code !== 0) {
  console.error("TCM account request failed:", tcmJson);
  process.exit(1);
}

console.log("TCM response:", tcmJson);

const tcmAccountId = tcmJson.data?.tto_tcm_account_ids?.[0];
if (!tcmAccountId) {
  throw new Error("No tto_tcm_account_ids returned");
}
console.log("Using TCM account ID:", tcmAccountId);

// Step 3: creator lookup
const creatorUrl = new URL(
  "https://business-api.tiktok.com/open_api/v1.3/tto/tcm/creator/public/",
);
creatorUrl.searchParams.set("tto_tcm_account_id", tcmAccountId);
creatorUrl.searchParams.set("handle_name", HANDLE_NAME);

const creatorRes = await fetch(creatorUrl, {
  method: "GET",
  headers: { "Access-Token": accessToken },
});

console.log("Creator response:", await creatorRes.json());