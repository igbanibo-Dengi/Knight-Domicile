"use client"

import { Button } from "./ui/button"
import { GitHubIcon } from "./icons/auth.comp"
import { GoogleIcon } from "./icons/auth.comp"
import { oauthAction } from "@/lib/actions/auth/oauth.actions"

type OAuthButtonsProps = {
    signup?: boolean
}

const OAuthButtons = ({ signup }: OAuthButtonsProps) => {

    const handleCLick = async (provider: "google" | "github") => {
        await oauthAction(provider)
    }
    const text = signup ? "Sign up" : "Sign in"

    return (
        <div className="w-[300px] flex flex-col gap-4">
            <Button
                onClick={handleCLick.bind(null, "google")}
                // onClick={() => handleCLick("google")}
                variant={"outline"}
                className="w-full flex items-center gap-4"
            >
                <GoogleIcon />
                {text} with Google
            </Button>
            <Button
                onClick={handleCLick.bind(null, "github")}
                // onClick={() => handleCLick("github")}
                variant={"outline"}
                className="w-full flex items-center gap-4"
            >
                <GitHubIcon />
                {text} with GitHub
            </Button>

        </div>
    )
}

export default OAuthButtons