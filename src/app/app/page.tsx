import { Loader2Icon } from "lucide-react";
import { Suspense } from "react";
import { CreatorInfos } from "@/features/creators/components/CreatorInfos";

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
