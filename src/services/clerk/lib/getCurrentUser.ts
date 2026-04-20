import { auth } from "@clerk/nextjs/server";
import { getUser } from "@/features/users/actions";


export async function getCurrentUser({ allData = false } = {}) {
  const { userId, redirectToSignIn } = await auth();
  // userId from CLERK

  // userId can be present from Clerk sign in, but user can be null if not in DB!
  // user will return "undefined" in this case

  return {
    userId,
    redirectToSignIn,
    user: allData && userId != null ? await getUser(userId) : undefined,
  };
}