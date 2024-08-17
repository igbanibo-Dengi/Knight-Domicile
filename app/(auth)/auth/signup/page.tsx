import { SignupForm } from "../_components/SignUpForm";

const SignUpPage = () => {
  return (
    <main className="w-full h-full">
      <div className="h-screen w-full flex gap-10 items-center justify-center">
        <div className="w-full h-full lg:w-1/2 flex flex-col items-center justify-center border-r-2">
          <h1>Sign Up</h1>
          <SignupForm />
        </div>
        <div className="hidden lg:flex lg:w-1/2 h-screen"></div>
      </div>
    </main>
  );
};

export default SignUpPage;
