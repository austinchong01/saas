import { getCurrentUser } from "@/services/clerk/lib/getCurrentUser";
import { redirect } from "next/navigation";
import { OnboardingClient } from "./_client";

export default async function OnboardingPage() {
  const { userId, user } = await getCurrentUser({ allData: true }); // userId from clerk's db, user from our db

  // allows for the user info to be done before redirecting


  // if user is not logged into clerk, go back to homepage
  if (userId == null) return redirect("/");

  // if user is logged into clerk and in db, go to app
  if (user != null) return redirect("/app");

  
  // logged into clerk but not in db
  return (
    <div className="container flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-4xl">Creating your account...</h1>
      <OnboardingClient userId={userId} />
    </div>
  );
}
