import { Loader2Icon } from "lucide-react";
import { Suspense } from "react";
import { CreatorFilterForm } from "@/features/creators/components/CreatorFilterForm";

export default async function AppPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const params = await searchParams;
  // console.log("raw filter params: ", params);

  return (
    <Suspense
      fallback={
        <div className="h-screen-header flex items-center justify-center">
          <Loader2Icon className="size-24 animate-spin" />
        </div>
      }
    >
      <div className="container my-4 max-w-5xl">
        <h1 className="text-3xl md:text-4xl lg:text-5xl mb-4">
          Welcome to Creator Hub
        </h1>
        <p className="text-muted-foreground mb-8">
          To get started, try adjusting the filters related to the creator/(s)
          you are interested in. The most relevant creators will be displayed
          first.
        </p>
        <CreatorFilterForm
          key={new URLSearchParams(params as Record<string, string>).toString()} // force remount when search params change
          searchParams={params}
        />
      </div>
    </Suspense>
  );
}
