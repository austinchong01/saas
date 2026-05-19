import { getCreator } from "../actions";
import Image from "next/image"
import { formatCount } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FilterBadges } from "./CreatorList";
import { searchParamsToFilters } from "../helpers";

export async function CreatorCard({
  username,
  back,
}: {
  username: string;
  back: string | undefined;
}) {
  const queryString = back?.split("?")[1] ?? "";
  const params = Object.fromEntries(new URLSearchParams(queryString));
  const { data: filters } = searchParamsToFilters(params);

  const creator = await getCreator(username);

  if ("error" in creator) {
    return (
      <div className="mx-auto my-4 max-w-xl flex flex-col gap-2">
        {back && (
          <div>
            <Button variant="outline" asChild className="self-start">
              <Link href={back}>← Back</Link>
            </Button>
            <FilterBadges filters={filters} />
          </div>
        )}
        <b>Creator not found: </b> {creator.message}
      </div>
    );
  }

  return (
    <>
      {back && (
        <div className="mx-auto my-4 max-w-xl flex flex-col gap-2">
          <Button variant="outline" asChild className="self-start">
            <Link href={back}>← Back</Link>
          </Button>
          <FilterBadges filters={filters} />
        </div>
      )}
      <div className="relative mx-auto max-w-xl pt-0 w-full my-4 overflow-hidden">
        <Image
          src={creator.profile_image}
          alt="profile_picture"
          width={500}
          height={500}
          className="relative z-20 aspect-video w-full object-cover brightness-60 dark:brightness-40"
        />

        <div>
          <div className="text-2xl font-bold">
            {creator.handle_name}
          </div>
          <p>{creator.display_name}</p>
          <div>
            <p>{creator.bio}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <p>Followers: {creator.followers_count}</p>
          <p>Likes: {creator.likes_count}</p>
          <p>Videos: {creator.videos_count}</p>
          <p>
            Content Type:{" "}
            {creator.content_labels
              .map(
                (l: { label_id: string; label_name: string }) => l.label_name,
              )
              .join(", ")}
          </p>
          <p>Median Views: {creator.median_views}</p>
          <p>Engagement Rate: {creator.engagement_rate}%</p>
        </div>
      </div>
    </>
  );
}
