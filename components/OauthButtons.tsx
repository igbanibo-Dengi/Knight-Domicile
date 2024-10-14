"use client";

import { Button } from "./ui/button";
import { oauthAction } from "@/lib/actions/auth/oauth.actions";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

type OAuthButtonsProps = {
  signup?: boolean;
};

const OAuthButtons = ({ signup }: OAuthButtonsProps) => {
  const [errMessage, setErrMessage] = useState("");
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    if (!error) return;

    if (error === "OAuthAccountNotLinked") {
      setErrMessage("This account is already in use. Please sign in.");
    } else {
      setErrMessage("An error occured. Please try again.");
    }
  }, [error]);

  const handleCLick = async (provider: "google" | "github") => {
    try {
      await oauthAction(provider);
    } catch (err) {
      console.log(err);
    }
  };

  const text = signup ? "Sign up" : "Sign in";

  return (
    <div>
      <div className="mb-4">
        <p className="text-center font-semibold text-muted-foreground">or</p>
      </div>
      <div className="mx-auto flex gap-4 px-10 md:max-w-[600px] md:px-20">
        <Button
          onClick={handleCLick.bind(null, "google")}
          variant={"outline"}
          className="flex w-full items-center gap-4"
        >
          <Image
            src={"/icons/google.png"}
            width={20}
            height={20}
            alt="google icon"
          />
          {text} with Google
        </Button>
        {errMessage && (
          <p className="mt-2 text-center text-sm font-medium text-destructive">
            {errMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default OAuthButtons;

type OAuthButtonsSkeletonProps = OAuthButtonsProps;

export const OAuthButtonsSkeleton = ({ signup }: OAuthButtonsSkeletonProps) => {
  const text = signup ? "Sign-up" : "Sign in";
  return (
    <div className="flex w-[410px] flex-col gap-4">
      <Button variant={"outline"} className="flex w-full items-center gap-4">
        <Image
          src={"/icons/google.png"}
          width={20}
          height={20}
          alt="google icon"
        />
        {text} with Google
      </Button>
    </div>
  );
};
