import { getCreator } from "../actions";
import Image from "next/image";
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
        <div className="mx-auto my-4 max-w-2xl flex flex-col gap-2">
          <Button variant="outline" asChild className="self-start">
            <Link href={back}>← Back</Link>
          </Button>
          <FilterBadges filters={filters} />
        </div>
      )}
      <div className="mx-auto max-w-2xl flex flex-col gap-8 justify-center py-4">
        <Image
          src={creator.profile_image}
          alt="profile_picture"
          width={250}
          height={250}
          className="rounded-lg mx-auto"
        />

        <div className="flex flex-col gap-2">
          <div className="text-3xl font-bold">{creator.handle_name}</div>
          <div>
            {" "}
            <p className="text-muted-foreground">Display Name:</p>{" "}
            <span className="text-lg">{creator.display_name}</span>
          </div>
          <div>
            <p className="text-muted-foreground">Bio:</p> {creator.bio}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-muted-foreground">Followers:</p>
            <span className="text-lg">{formatCount(creator.followers_count)}</span>
          </div>
          <div>
            <p className="text-muted-foreground">Likes:</p>
            <span className="text-lg">{formatCount(creator.likes_count)}</span>
          </div>
          <div>
            <p className="text-muted-foreground">Videos:</p>
            <span className="text-lg">{formatCount(creator.videos_count)}</span>
          </div>
          <div>
            <p className="text-muted-foreground">Content Type:</p>
            <span className="text-lg">
              {creator.content_labels
                .map(
                  (l: { label_id: string; label_name: string }) => l.label_name,
                )
                .join(", ")}
            </span>
          </div>
          <div>
            <p className="text-muted-foreground">Median Views:</p>
            <span className="text-lg">{formatCount(creator.median_views)}</span>
          </div>
          <div>
            <p className="text-muted-foreground">Engagement Rate:</p>
            <span className="text-lg">{creator.engagement_rate}%</span>
          </div>
        </div>
      </div>
    </>
  );
}
