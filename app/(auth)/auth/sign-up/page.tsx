import Link from "next/link";
import { SignupForm } from "../_components/SignUpForm";
import { Button } from "@/components/ui/button";
import OAuthButtons, { OAuthButtonsSkeleton } from "@/components/OauthButtons";
import { Suspense } from "react";
import Image from "next/image";

const SignUpPage = () => {
  return (
    <main className="h-full w-full">
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 md:border-r-2 lg:w-1/2">
          <h1>Sign Up</h1>

          <div className="w-full space-y-4">
            <SignupForm />
            <Suspense fallback={<OAuthButtonsSkeleton signup />}>
              <OAuthButtons signup />
            </Suspense>
            <Button variant={"link"} className="text-muted-foreground" asChild>
              <Link href="/auth/sign-in" className="w-full text-center">
                Already have an account?
                <span className="ml-1 text-primary"> Sign in</span>
              </Link>
            </Button>
          </div>
        </div>
        <div className="relative hidden h-screen lg:flex lg:w-1/2">
          <Image
            src="/images/auth.jpg"
            alt="People working together in an office"
            layout="fill"
            objectFit="cover "
            priority
            className="w-full"
          />
          {/* <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <p className="text-white text-3xl font-bold text-center px-4">
              Join our community of professionals
            </p>
          </div> */}
        </div>
      </div>
    </main>
  );
};

export default SignUpPage;
