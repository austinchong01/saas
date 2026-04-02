import { CreatorCard } from "@/features/creators/components/CreatorCard";
import { Loader2Icon } from "lucide-react";
import { Suspense } from "react";

export default async function AppPage({
  params,
  searchParams,
}: {
  params: Promise<{ creatorId: string }>;
  searchParams: Promise<{ back?: string }>;
}) {
  const { creatorId } = await params;
  const { back } = await searchParams;

  return (
    <Suspense
      fallback={
        <div className="h-screen-header flex items-center justify-center">
          <Loader2Icon className="size-24 animate-spin" />
        </div>
      }
    >
      <CreatorCard username={creatorId} back={back} />
    </Suspense>
  );
}
