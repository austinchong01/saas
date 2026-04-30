import { getCreatorsByFilters } from "@/features/creators/actions";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/CreatorCard";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  BadgeCheck,
  Eye,
  Heart,
  Users,
  Tag,
  Globe,
  Languages,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { filtersToSearchParams, searchParamsToFilters } from "../helpers";
import Link from "next/link";
import { formatCount } from "@/lib/utils";
import { toast } from "sonner";

export async function CreatorList({
  searchParams = {},
}: {
  searchParams?: Record<string, string>;
}) {
  const { data: filters, error } = searchParamsToFilters(searchParams); // error on invalid param filters
  const url = filtersToSearchParams(filters);

  const creators = await getCreatorsByFilters(filters);
  if ("error" in creators) {
    toast.error(creators.message);
    return <NoCreatorsFound url={url} />;
  }

  if (creators.length == 0) return <NoCreatorsFound url={url} />;
  return <CreatorsFound creators={creators} url={url} />;
}

function NoCreatorsFound({ url }: { url: string }) {
  return (
    <div className="container my-4 max-w-5xl">
      <h1 className="text-3xl md:text-4xl lg:text-5xl mb-4">
        No Creators Found
      </h1>
      <p className="text-muted-foreground mb-8">
        Try adjusting the filters related to the creator/(s) you are interested
        in. The most relevant creators will be displayed first.
      </p>
      <Button asChild>
        <Link href={`/app?${url}`}>Edit Filters</Link>
      </Button>
    </div>
  );
}

function CreatorsFound({ creators, url }: { creators: any[]; url: string }) {
  return (
    <div className="container my-4 max-w-5xl">
      <div className="grid gap-4">
        {/* <Input placeholder="Search creators..." value={""} /> */}
        <Button asChild>
          <Link href={`/app?${url}`}>Edit Filters</Link>
        </Button>
        {creators.map((creator) => (
          <Card key={creator.handle_name}>
            <CardHeader>
              <div className="flex flex-0 gap-4 items-center">
                <Avatar size="lg">
                  <AvatarImage
                    src={creator.profile_image}
                    alt={creator.display_name}
                  />
                  <AvatarFallback>
                    {creator.display_name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{creator.display_name}</CardTitle>
                  <CardDescription>@{creator.handle_name}</CardDescription>
                </div>
                {/* <div>
                  {creator.is_verified && (
                    <BadgeCheck className="size-6 text-blue-500" />
                  )}
                </div> */}
              </div>

              <CardAction>
                <Button variant="outline" size="sm" asChild>
                  <Link
                    href={`/app/creators/${creator.username}?back=${encodeURIComponent(`/app/creators?${url}`)}`}
                  >
                    Profile
                  </Link>
                </Button>
              </CardAction>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-2 gap-6 text-sm">
                <div className="flex items-center gap-2 h-5 w-56">
                  <Users className="size-4 text-muted-foreground" />
                  <span>{formatCount(creator.followers_count)} followers</span>
                </div>
                <div className="flex items-center gap-2 h-5 w-56">
                  <Heart className="size-4 text-muted-foreground" />
                  <span className="nowraptext">
                    {formatCount(creator.likes_count)} likes
                  </span>
                </div>
                <div className="flex items-center gap-2 h-5 w-56">
                  <Languages className="size-4 text-muted-foreground" />
                  <span>{formatCount(creator.videos_count)} videos</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
