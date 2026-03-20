import { getCreatorsByFilters } from "@/features/creators/actions";
import { getCurrentUser } from "@/services/clerk/lib/getCurrentUser";
import { CreatorFilters } from "@/features/creators/actions";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
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

export async function CreatorList({
  filters = {},
}: {
  filters?: CreatorFilters;
}) {
  const { userId, redirectToSignIn } = await getCurrentUser();
  if (userId == null) return redirectToSignIn();

  // const creators = await getCreatorsByFilters(filters);
  const creators = await getCreatorsByFilters({});

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
                <Button variant="outline" size="sm">
                  Profile
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
                  <span className="nowraptext">{formatCount(creator.likes)} likes</span>
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
