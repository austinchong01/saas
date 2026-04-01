import { getCreatorsByFilters } from "@/features/creators/actions";
import { getCurrentUser } from "@/services/clerk/lib/getCurrentUser";
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
import { filtersToSearchParams, searchParamsToFilters } from "../url";
import Link from "next/link";
import { formatCount } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export async function CreatorList({
  searchParams = {},
}: {
  searchParams?: Record<string, string | string[]>;
}) {
  const { userId, redirectToSignIn } = await getCurrentUser();
  if (userId == null) return redirectToSignIn();

  const filters = searchParamsToFilters(searchParams);
  const creators = await getCreatorsByFilters(filters);

  const url = filtersToSearchParams(filters);

  if (creators.length == 0) return <NoCreatorsFound url={url}/>;
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
        <Input placeholder="Search creators..." value={""} />
        <Button asChild>
          <Link href={`/app?${url}`}>Edit Filters</Link>
        </Button>
        {creators.map((creator) => (
          <Card key={creator.id}>
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
                  <CardDescription>@{creator.username}</CardDescription>
                </div>
                <div>
                  {creator.is_verified && (
                    <BadgeCheck className="size-6 text-blue-500" />
                  )}
                </div>
              </div>

              <div className="text-sm text-muted-foreground">{creator.bio}</div>
              <CardAction>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/app/creators/creator?handlename=${creator.username}&back=${encodeURIComponent(`/app/creators?${url}`)}`}>
                    Profile
                  </Link>
                </Button>
              </CardAction>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-2 gap-6 text-sm">
                <div className="flex items-center gap-2 h-5 w-56">
                  <Users className="size-4 text-muted-foreground" />
                  <span>{formatCount(creator.followers)} followers</span>
                </div>
                <div className="flex items-center gap-2 h-5 w-56">
                  <Heart className="size-4 text-muted-foreground" />
                  <span className="nowraptext">
                    {formatCount(creator.likes)} likes
                  </span>
                </div>
                <div className="flex items-center gap-2 h-5 w-56">
                  <Tag className="size-4 text-muted-foreground" />
                  <span>{creator.content_type}</span>
                </div>
                <div className="flex items-center gap-2 h-5 w-56">
                  <Eye className="size-4 text-muted-foreground" />
                  <span className="nowraptext">
                    {formatCount(creator.median_views)} views (median)
                  </span>
                </div>
                <div className="flex items-center gap-2 h-5 w-56">
                  <Globe className="size-4 text-muted-foreground" />
                  <span>{creator.country}</span>
                </div>
                <div className="flex items-center gap-2 h-5 w-56">
                  <Languages className="size-4 text-muted-foreground" />
                  <span>{creator.language} (language)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
