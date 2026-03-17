import { getCurrentUser } from "@/services/clerk/lib/getCurrentUser";
import { Loader2Icon } from "lucide-react";
import { Suspense } from "react";

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

async function CreatorInfos(filters: Array<string> = []) {
    const { userId, redirectToSignIn } = await getCurrentUser();
    
    if (userId == null) return redirectToSignIn;

    const creatorInfos = await getCreatorInfos(userId, filters);
}

async function getCreatorInfos(userId: string, filters: Array<string> = []) {
    // need to have mock data
    // use cache
    // have filtering
}