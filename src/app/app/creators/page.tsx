import { CreatorList } from "@/features/creators/components/CreatorList";
import { Loader2Icon } from "lucide-react";
import { Suspense } from "react";

export default async function AppPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const params = await searchParams;
  // console.log("raw params:", params);

  return (
    <Suspense
      fallback={
        <div className="h-screen-header flex items-center justify-center">
          <Loader2Icon className="size-24 animate-spin" />
        </div>
      }
    >
      <CreatorList searchParams={params} />
    </Suspense>
  );
}
