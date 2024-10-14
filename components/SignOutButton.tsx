"use client";

import React from "react";
import { Button } from "./ui/button";
import { signoutAction } from "@/lib/actions/auth/signout.actions";
import { LogOut } from "lucide-react";

const SignOutButton = () => {
  const onClickHandler = async () => {
    await signoutAction();
    window.location.href = "/";
  };

  return (
    <Button
      variant={"secondary"}
      className="w-full gap-2 md:justify-start"
      onClick={onClickHandler}
    >
      <LogOut /> Sign Out
    </Button>
  );
};
export default SignOutButton;
