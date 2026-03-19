import { getCreatorsByFilters } from "@/features/creators/actions";
import { getCurrentUser } from "@/services/clerk/lib/getCurrentUser";
import { CreatorFilters } from "@/features/creators/actions";
import { Card, CardContent } from "@/components/ui/card";

export async function CreatorInfos({ filters = {} }: { filters?: CreatorFilters }) {
  const { userId, redirectToSignIn } = await getCurrentUser();
  if (userId == null) return redirectToSignIn();

  // const creators = await getCreatorsByFilters(filters);
  const creators = await getCreatorsByFilters({ median_views_min: 1000 });

  return <NoCreatorsFound />
}

function NoCreatorsFound() {
  return (
    <div className="container my-4 max-w-5xl">
      <h1 className="text-3xl md:text-4xl lg:text-5xl mb-4">
        Welcome to Creator Hub
      </h1>
      <p className="text-muted-foreground mb-8">
        To get started, try adjusting the filters related to the creator/(s) you're
        interested in. The most popular creators will be displayed first.
      </p>
      <Card>
        <CardContent>
          <CreatorInfoForm />
        </CardContent>
      </Card>
    </div>
  );
}
