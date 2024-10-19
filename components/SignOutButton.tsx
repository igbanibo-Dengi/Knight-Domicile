"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { signoutAction } from "@/lib/actions/auth/signout.actions";
import { LogOut } from "lucide-react";
import { usePathname } from "next/navigation";

const SignOutButton = () => {
  const [loading, setLoading] = useState(false)
  const path = usePathname()


  const onClickHandler = async () => {
    setLoading(true)
    await signoutAction();
    if (path === "/profile") {
      window.location.href = "/";
      return
    }
    // window.location.href = "/";

    setLoading(false)

  };

  return (
    <Button
      variant={"secondary"}
      className="w-full gap-2 md:justify-start"
      onClick={onClickHandler}
      disabled={loading}
    >
      <LogOut />{loading ? "Signing Out..." : "Sign Out"}
    </Button>
  );
};
export default SignOutButton;
