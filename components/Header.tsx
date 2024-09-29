import Link from "next/link";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignJustify } from "lucide-react";
import { NavlLinks } from "./NavlLinks";
import { auth } from "@/auth";

export const Header = async () => {
  const links = [
    { href: "/", label: "Explore" },
    { href: "/saved", label: "Saved" },
    { href: "/about", label: "About" },
  ];


  const session = await auth();

  const user = session?.user;

  return (
    <nav className="h-14 md:py-8">
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
              <NavlLinks user={user!} />
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
