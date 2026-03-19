import { deleteUser, upsertUser } from "@/features/users/db";
import { revalidateUserCache } from "@/features/users/dbCache";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const event = await verifyWebhook(request); // verify signature and parse event

    switch (event.type) {
      case "user.created":
      case "user.updated":
        const clerkData = event.data;
        const email = clerkData.email_addresses.find(
          (e) => e.id === clerkData.primary_email_address_id,
        )?.email_address; // get email or null if not found

        // if email does not exist
        if (email == null) {
            return new Response("No primary email found", { status: 400 });
        }

        await upsertUser({
          id: clerkData.id,
          email,
          name: `${clerkData.first_name} ${clerkData.last_name}`,
          imageUrl: clerkData.image_url,
          createdAt: new Date(clerkData.created_at),
          updatedAt: new Date(clerkData.updated_at),
        });

        revalidateUserCache(clerkData.id);

        break;
      case "user.deleted":
        if (event.data.id == null) {
            return new Response("No user ID found", { status: 400 });
        }

        await deleteUser(event.data.id);
        
        revalidateUserCache(event.data.id);
        
        break;
    }
  } catch {
    return new Response("Invalid webhook", { status: 400 });
  }

  return new Response("Webhook received", { status: 200 });
}
