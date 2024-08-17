import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

export const Header = () => {
  return (
    <nav className="h-14 border-b-2 py-6">
      <div className="h-full container flex justify-between items-center">
        <h3 className="text-3xl tracking-tight font-bold">
          <Link href="/">Next.Js</Link>
        </h3>
        <ul className="flex items-center gap-x-4">
          <li>
            <Button variant={"outline"} size={"sm"} asChild>
              <Link href="/auth/sign-in">Sign In</Link>
            </Button>
          </li>
          <li>
            <Button variant={"outline"} size={"sm"} asChild>
              <Link href="/auth/signup">Sign Up</Link>
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
};
