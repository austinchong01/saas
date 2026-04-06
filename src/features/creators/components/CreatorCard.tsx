import { getCurrentUser } from "@/services/clerk/lib/getCurrentUser";
import { getCreator } from "../actions";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BadgeCheck } from "lucide-react";
import { formatCount } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export async function CreatorCard({
  username,
  back,
}: {
  username: string;
  back: string | undefined;
}) {
  // check if user is signed in
  const { userId, redirectToSignIn } = await getCurrentUser();
  if (userId == null) return redirectToSignIn();

  const creator = await getCreator(username);;

  if (!creator) {
    return <div>Creator not found</div>;
  }

  return (
    <>
      {back && (
        <div className="mx-auto my-4 max-w-xl">
          <Button variant="outline" asChild>
            <Link href={back}>← Back</Link>
          </Button>
        </div>
      )}
    <Card className="relative mx-auto max-w-xl pt-0 w-full my-4 overflow-hidden">
      <img
        src={creator.profile_image}
        alt="profile_picture"
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
      />

      <CardHeader>
        <CardTitle className="text-2xl font-bold">{creator.username}</CardTitle>
        <p>{creator.display_name}</p>
        <CardAction>
          {creator.is_verified && (
            <BadgeCheck className="size-6 text-blue-500" />
          )}
        </CardAction>
        <CardDescription>
          <p>{creator.bio}</p>
        </CardDescription>
      </CardHeader>

      <CardContent className="grid grid-cols-2 gap-2">
        <p>Followers: {formatCount(creator.followers)}</p>
        <p>Likes: {formatCount(creator.likes)}</p>
        <p>Videos: {formatCount(creator.video_count)}</p>
        <p>Content Type: {creator.content_type}</p>
        <p>Median Views: {formatCount(creator.median_views)}</p>
        <p>Engagement Rate: {creator.engagement_rate}%</p>
      </CardContent>
      
    </Card>
    </>
  );
}
