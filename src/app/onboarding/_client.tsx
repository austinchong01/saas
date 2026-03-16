"use client";

import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
// import { getUser } from "@/services/clerk/lib/getCurrentUser";

export function OnboardingClient({ userId }: { userId: string }) {
    const router = useRouter()
    useEffect(() => {
        const intervalId = setInterval(async () => {
            const user = await getUser(userId);
            if (user == null) return;

            // once the user info is ready, we can redirect to the app
            router.replace("/app");
            clearInterval(intervalId);
        }, 250);

        return () => clearInterval(intervalId);
    }, [userId, router]);

  return <Loader2Icon className="animate-spin" size={24} />;
}
