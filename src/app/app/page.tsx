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
    
    if (userId == null) return redirectToSignIn;

    // const creators = await getCreatorsByFilters(filters);
    const creators = await getCreatorsByFilters({content_type: "gaming"});

    // TODO: render the creators
    return <div>{creators[0].display_name}</div>;
}