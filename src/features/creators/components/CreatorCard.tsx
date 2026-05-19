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
      <div className="mx-auto max-w-2xl flex flex-col gap-8 justify-center">
        <Image
          src={creator.profile_image}
          alt="profile_picture"
          width={300}
          height={300}
        />

        <div className="flex flex-col gap-2">
          <div className="text-3xl font-bold">{creator.handle_name}</div>
          <div>
            {" "}
            <b>Display Name:</b>{" "}
            <span className="text-lg">{creator.display_name}</span>
          </div>
          <div>
            <b>Bio:</b> {creator.bio}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <b>Followers:</b>{" "}
            <span className="text-lg">{creator.followers_count}</span>
          </div>
          <div>
            <b>Likes:</b> <span className="text-lg">{creator.likes_count}</span>
          </div>
          <div>
            <b>Videos:</b>{" "}
            <span className="text-lg">{creator.videos_count}</span>
          </div>
          <div>
            <b>Content Type:</b>{" "}
            <span className="text-lg">
              {creator.content_labels
                .map(
                  (l: { label_id: string; label_name: string }) => l.label_name,
                )
                .join(", ")}
            </span>
          </div>
          <div>
            <b>Median Views:</b>{" "}
            <span className="text-lg">{creator.median_views}</span>
          </div>
          <div>
            <b>Engagement Rate:</b>{" "}
            <span className="text-lg">{creator.engagement_rate}%</span>
          </div>
        </div>
      </div>
    </>
  );
}
