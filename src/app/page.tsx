import { SignInButton, UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "../components/ThemeToggle";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Card, CardDescription, CardTitle } from "@/components/ui/CreatorCard";

export default async function HomePage() {
  const { userId } = await auth();

  if (userId != null) {
    redirect("/app");
  }
  return (
    <>
      <div className="p-4 space-y-4">
        <div className="flex items-center gap-4">
          <SignInButton />
          <UserButton />
          <ThemeToggle />
        </div>
      </div>
    <Card className="relative mx-auto max-w-md w-full px-4 py-8 my-4">
        <CardTitle>Welcome to Creator Hub!</CardTitle>
        <CardDescription>Please Sign In to access the app.</CardDescription>
      </Card>
    </>
  );
}
