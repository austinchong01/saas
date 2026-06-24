"use client";

import { BrainCircuitIcon, User } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Clerk auth is currently disabled; this Navbar no longer receives a real
// user. The dropdown is kept as a placeholder so it's a small diff to wire
// Clerk back in later (see _Navbar.tsx history / Clerk components left in repo).
export function Navbar() {
  return (
    <nav className="h-header flex items-center justify-between border-b px-4">
      <Link href="/app" className="flex items-center gap-2">
        <BrainCircuitIcon className="size-6" />
        <span className="text-lg font-semibold">Creator Hub</span>
      </Link>

      <div className="flex items-center gap-2">
        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarFallback>
                <User className="size-4" />
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem disabled>
              Auth disabled
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}