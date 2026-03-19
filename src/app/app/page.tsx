import { getCreatorsByFilters } from "@/features/creators/actions";
import { getCurrentUser } from "@/services/clerk/lib/getCurrentUser";
import { Loader2Icon } from "lucide-react";
import { Suspense } from "react";
import { CreatorFilters } from "@/features/creators/actions";

export default function AppPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen-header flex items-center justify-center">
          <Loader2Icon className="size-24 animate-spin" />
        </div>
      }
    >
      <CreatorInfos />
    </Suspense>
  );
}

async function CreatorInfos({ filters = {} }: { filters?: CreatorFilters }) {
  const { userId, redirectToSignIn } = await getCurrentUser();
  if (userId == null) return redirectToSignIn();

  // const creators = await getCreatorsByFilters(filters);
  const creators = await getCreatorsByFilters({ median_views_min: 1000 });

  if (creators.length === 0) {
    return <NoCreatorsFound />;
  }
  // TODO: render the creators
  return <div>{creators[7].display_name}</div>;
}

function NoCreatorsFound() {
  return (
    <div className="container my-4 max-w-5xl">
      <h1 className="text-3xl md:text-4xl lg:text-5xl mb-4">
        Welcome to CreatorHub
      </h1>
      <p className="text-muted-foreground mb-8">
        To get started, try adjusting the filters related to the creator/(s) you're
        interested in. The most popular creators will be displayed first.
      </p>
      <Card />
    </div>
  );
}
