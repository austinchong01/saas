"use client";

import { useClerk, SignOutButton } from "@clerk/nextjs";
import { BrainCircuitIcon, LogOut, User } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { UserAvatar } from "@/components/UserAvatar";

export function Navbar({ user }: { user: { name: string; imageUrl: string } }) {
  const { openUserProfile } = useClerk();

  return (
    <nav className="h-header flex items-center justify-between border-b px-4">
      <Link href="/app" className="flex items-center gap-2">
        <BrainCircuitIcon className="size-6" />
        <span className="text-lg font-semibold">Creator Search</span>
      </Link>

      <div className="flex items-center gap-2">
        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <UserAvatar user={user} className="cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => openUserProfile()}
            >
              <User className="mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <SignOutButton>
              <DropdownMenuItem className="cursor-pointer">
                <LogOut className="mr-2" />
                Logout
              </DropdownMenuItem>
            </SignOutButton>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
