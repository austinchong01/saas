import { Loader2Icon } from "lucide-react";
import { Suspense } from "react";
import { CreatorFilterForm } from "@/features/creators/components/CreatorFilterForm";

export default function AppPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen-header flex items-center justify-center">
          <Loader2Icon className="size-24 animate-spin" />
        </div>
      }
    >
      <CreatorFilterForm />
    </Suspense>
  );
}
