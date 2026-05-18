"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

export function CreatorSearchInput({ backUrl }: { backUrl: string }) {
  const router = useRouter();
  const [value, setValue] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const handle = value.trim().replace(/^@/, "");
    if (!handle) return;
    router.push(
      `/app/creators/${encodeURIComponent(handle)}?back=${encodeURIComponent(`/app/creators?${backUrl}`)}`,
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        placeholder="Search by handle..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
}