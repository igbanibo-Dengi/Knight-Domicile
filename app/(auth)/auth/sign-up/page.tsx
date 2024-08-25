import Image from 'next/image'
import { SignupForm } from '../_components/SignUpForm'

export default function SignInPage() {
  return (
    <main className="w-full h-full">
      <div className="h-screen w-full flex gap-10 items-center justify-center">
        <div className="w-full h-full lg:w-1/2 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
          <SignupForm />
        </div>
        <div className="hidden lg:flex lg:w-1/2 h-screen relative">
          <Image
            src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="People working together in an office"
            layout="fill"
            objectFit="cover "
            priority
            className='w-full'
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <p className="text-white text-3xl font-bold text-center px-4">
              Join our community of professionals
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}