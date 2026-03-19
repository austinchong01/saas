import { getCreatorsByFilters } from "@/features/creators/actions";
import { getCurrentUser } from "@/services/clerk/lib/getCurrentUser";
import { CreatorFilters } from "@/features/creators/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

export async function CreatorList({
  filters = {},
}: {
  filters?: CreatorFilters;
}) {
  const { userId, redirectToSignIn } = await getCurrentUser();
  if (userId == null) return redirectToSignIn();

  // const creators = await getCreatorsByFilters(filters);
  const creators = await getCreatorsByFilters({ country_code: "US" });

  return <Main creators={creators} />;
}

function formatCount(num: number): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toString();
}

function Main({ creators }: { creators: any[] }) {
  return (
    <div className="container my-4 max-w-5xl">
      <h1 className="text-3xl md:text-4xl lg:text-5xl mb-4">
        Welcome to Creator Hub
      </h1>

      {/* <p className="text-muted-foreground mb-8">
        To get started, try adjusting the filters related to the creator/(s) you're
        interested in. The most popular creators will be displayed first.
      </p> */}

      <div className="grid gap-4">
        {creators.map((creator) => (
          <Card
            key={creator.id}
            className="flex-row gap-5 items-center min-w-fit"
          >
            <CardHeader className="flex flex-col gap-3 justify-center w-100">
              <div className="flex flex-0 gap-3 items-center">
                <Avatar size="lg">
                  <AvatarImage
                    src={creator.profile_image}
                    alt={creator.display_name}
                  />
                  <AvatarFallback>
                    {creator.display_name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="shrink-0">
                  <CardTitle className="flex items-center gap-1.5">
                    {creator.display_name}
                  </CardTitle>
                  <CardDescription>@{creator.username}</CardDescription>
                </div>
                <div>
                  {creator.is_verified && (
                    <BadgeCheck className="size-6 text-blue-500" />
                  )}
                </div>
              </div>

              <div className="text-sm text-muted-foreground">{creator.bio}</div>
            </CardHeader>

            <CardContent className="flex-1 w-100">
              <div className="grid grid-cols-2 gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="size-4 text-muted-foreground shrink-0" />
                  <span className="whitespace-nowrap">
                    {formatCount(creator.followers)} followers
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="size-4 text-muted-foreground shrink-0" />
                  <span className="whitespace-nowrap">
                    {formatCount(creator.likes)} likes
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="size-4 text-muted-foreground shrink-0" />
                  <span className="whitespace-nowrap">
                    {creator.content_type}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="size-4 text-muted-foreground shrink-0" />
                  <span className="whitespace-nowrap">
                    {formatCount(creator.median_views)} views (median)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="size-4 text-muted-foreground shrink-0" />
                  <span className="whitespace-nowrap">
                    {creator.country}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Languages className="size-4 text-muted-foreground shrink-0" />
                  <span className="whitespace-nowrap">
                    {creator.language} (language)
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
