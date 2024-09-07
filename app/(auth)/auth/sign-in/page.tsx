import { Button } from "@/components/ui/button";
import { SignInForm } from "../_components/SignInForm";
import Link from "next/link";
import OAuthButtons from "@/components/OauthButtons";

const SignInPage = () => {
  return (
    <main className="h-full w-full">
      <div className="flex h-screen w-full items-center justify-center gap-10">
        <div className="flex h-full w-full flex-col gap-4 items-center justify-center border-r-2 lg:w-1/2">
          <h1>Sign In</h1>
          {/* sign in forrm */}
          <SignInForm />

          {/* Oauth Buttons */}
          <OAuthButtons />

          {/* redirrect */}
          <Button
            variant={"link"}
            className="text-muted-foreground"
            asChild
          >
            <Link href="/auth/sign-up">
              Don&apos;t have an account? Sign up
            </Link>
          </Button>
        </div>
        <div className="hidden h-screen lg:flex lg:w-1/2"></div>
      </div>
    </main>
  );
};

export default SignInPage;
