import { SignInForm } from "../_components/SignInForm";

const SignInPage = () => {
  return (
    <main className="w-full h-full">
      <div className="h-screen w-full flex gap-10 items-center justify-center">
        <div className="w-full h-full lg:w-1/2 flex flex-col items-center justify-center border-r-2">
          <h1>Sign In</h1>
          <SignInForm />
        </div>
        <div className="hidden lg:flex lg:w-1/2 h-screen"></div>
      </div>
    </main>
  );
};

export default SignInPage;
