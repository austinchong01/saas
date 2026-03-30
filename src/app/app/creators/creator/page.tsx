import { CreatorCard } from "@/features/creators/components/CreatorCard";
import { Loader2Icon } from "lucide-react";
import { Suspense } from "react";

export default async function AppPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const params = await searchParams;

  return (
    <Suspense
      fallback={
        <div className="h-screen-header flex items-center justify-center">
          <Loader2Icon className="size-24 animate-spin" />
        </div>
      }
    >
      <CreatorCard params={params} />
    </Suspense>
  );
}
