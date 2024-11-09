"use client";

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

  const pathname = usePathname();

  return (
    <nav
      className={`fixed z-20 h-14 w-full md:py-8 ${pathname.startsWith("/properties") ? "bg-muted" : "bg-background"} ${pathname.startsWith("/saved") ? "bg-muted" : "bg-background"}`}
    >
      <div className="flex h-full max-w-[1800px] items-center justify-between px-2 sm:container">
        <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
          <Link href="/" className="text-black">Knight <span className="text-[#e8c248]">Domicile</span></Link>
        </h3>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <AlignJustify className="mr-2" />
            </SheetTrigger>
            <SheetContent>
              <div className="mt-8 flex h-[90%] flex-col gap-4">
                {links.map((link, index) => (
                  <SheetClose asChild key={index}>
                    <Link href={link.href} className="w-full text-left text-lg">
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}

                <div className="mt-auto w-full">
                  <div className="mb-2 flex items-center gap-4 rounded-md bg-muted p-4">
                    {/* <span className="flex size-12 items-center justify-center rounded-full bg-primary text-white">
                      {user?.name?.[0] ?? <CircleUserRound />}
                    </span> */}
                    <div className="">
                      <p className="text-lg font-semibold capitalize">
                        {user?.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {user?.email}
                      </p>
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
