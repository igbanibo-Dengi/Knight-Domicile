import Link from "next/link";
import React from "react";
import NavLinks from "./NavLinks";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignJustify } from "lucide-react";
import { Button } from "../ui/button";

export const Header = () => {
  const links = [
    { href: "/", label: "Explore" },
    { href: "/saved", label: "Saved" },
  ];

  return (
    <nav className="h-14 md:py-8">
      <div className="container max-w-[1800px] flex justify-between items-center h-full">
        <h3 className="text-3xl font-bold tracking-tight">
          <Link href="/">Knight</Link>
        </h3>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <AlignJustify />
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-4 mt-8">
                {links.map((link, index) => (
                  <SheetClose asChild key={index}>
                    <Link href={link.href} className="text-lg w-full text-left">
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
                <Button size="sm" asChild className="mt-auto">
                  <Link href="/auth/sign-up">Sign Up</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <span className="hidden md:block">
          <NavLinks />
        </span>
      </div>
    </nav>
  );
};
