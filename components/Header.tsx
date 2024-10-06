'use client'

import Link from "next/link";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignJustify, CircleUserRound } from "lucide-react";
import { NavlLinks } from "./NavlLinks";
import SignOutButton from "./SignOutButton";
import { usePathname } from "next/navigation";
import { User } from "next-auth";

export const Header = ({ user }: { user: User | undefined }) => {
  const links = [
    { href: "/", label: "Explore" },
    { href: "/saved", label: "Saved" },
    { href: "/about", label: "About" },
    { href: "/profile", label: "Profile" },
    { href: "/help", label: "Help & Support" },
  ];




  const pathname = usePathname()

  return (
    <nav className={`h-14 md:py-8 fixed z-20 w-full ${pathname.startsWith("/properties") ? "bg-muted" : "bg-background"}`}>
      <div className=" sm:container max-w-[1800px] flex justify-between items-center h-full px-2">
        <h3 className="text-3xl font-bold tracking-tight">
          <Link href="/">Knight</Link>
        </h3>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <AlignJustify className="mr-2" />
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-4 mt-8 h-[90%]">
                {links.map((link, index) => (
                  <SheetClose asChild key={index}>
                    <Link href={link.href} className="text-lg w-full text-left">
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}

                <div className="mt-auto w-full">
                  <div className="flex items-center gap-4 p-4 mb-2 bg-muted rounded-md">
                    <span className="bg-primary text-white flex items-center justify-center size-12 rounded-full">
                      {user?.name?.[0] ?? <CircleUserRound />}
                    </span>
                    <div className="">
                      <p className="text-lg capitalize font-semibold">{user?.name}</p>
                      <p className="text-muted-foreground text-sm">{user?.email}</p>
                    </div>
                  </div>
                  <SignOutButton />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <span className="hidden md:block">
          <NavlLinks user={user!} />
        </span>
      </div>
    </nav>
  );
};
