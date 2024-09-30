import { Button } from "@/components/ui/button";
import { SignInForm } from "../_components/SignInForm";
import Link from "next/link";
import OAuthButtons, { OAuthButtonsSkeleton } from "@/components/OauthButtons";
import { Suspense } from "react";
import { ForgotPasswordForm } from "../_components/forgot-password-form";
import Image from "next/image";

const SignInPage = () => {
  return (
    <main className="h-full w-full">
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex h-full w-full flex-col gap-4 items-center justify-center border-r-2 lg:w-1/2">
          <h1>Sign In</h1>
          <div className="w-full space-y-4">
            <SignInForm />
            <Suspense fallback={<OAuthButtonsSkeleton />}>
              <OAuthButtons />
            </Suspense>

            <Button
              variant={"link"}
              className="text-muted-foreground"
              asChild
            >
              <Link href="/auth/sign-up" className="text-center w-full">
                Don&apos;t have an account?<span className="text-primary ml-1"> Sign Up</span>
              </Link>
            </Button>
            {/* Forgot Password Dialog */}
            <ForgotPasswordForm />
          </div>
        </div>
        <div className="hidden lg:flex lg:w-1/2 h-screen relative">
          <Image
            src="/images/auth.jpg"
            alt="People working together in an office"
            layout="fill"
            objectFit="cover "
            priority
            className='w-full'
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

export default SignInPage;
