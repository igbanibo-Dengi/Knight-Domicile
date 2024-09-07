import Link from "next/link";
import { SignupForm } from "../_components/SignUpForm";
import { Button } from "@/components/ui/button";
import OAuthButtons from "@/components/OauthButtons";

const SignUpPage = () => {
  return (
    <main className="h-full w-full">
      <div className="flex h-screen w-full items-center justify-center md:gap-10">
        <div className="flex h-full w-full flex-col items-center justify-center md:border-r-2 gap-2 lg:w-1/2">
          <h1>Sign Up</h1>

          {/* SIGN UP FORM */}
          <SignupForm />

          {/* OAUTH BUTTONS */}
          <OAuthButtons signup />

          <Button
            variant={"link"}
            className=" text-muted-foreground"
            asChild
          >
            <Link href="/auth/sign-in">Already have an account? Sign in</Link>
          </Button>
        </div>
        <div className="hidden h-screen lg:flex lg:w-1/2"></div>
      </div>
    </main>
  );
};

export default SignUpPage;
