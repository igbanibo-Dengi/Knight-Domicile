import { auth } from '@/auth'
import SignOutButton from '@/components/SignOutButton';
import { Button } from '@/components/ui/button';
import { type User } from 'next-auth';
import Link from 'next/link';
import React from 'react'

const page = async () => {
    const session = await auth()
    // console.log(session);
    return (
        <main className='mt-4'>
            <div className='container'>
                <h1 className="text-3xl font-bold tracking-light">Profile</h1>
                <div className="my-4 h-1 bg-muted" />
                {!!session?.user ? <SignedIn user={session.user} /> : <SignedOut />}
            </div>
        </main>
    )
}

export default page


const SignedIn = ({ user }: { user: User }) => {
    return (
        <>
            <h2 className='text-2xl font-bold tracking-tight'>User Information</h2>
            <table className='mt-4 table-auto divide-y'>
                <thead>
                    <tr className=' divide-x'>
                        <th className='bg-gray-50 px-6 py-3 text-start'>name</th>
                        <th className='bg-gray-50 px-6 py-3 text-start'>email</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='divide-x'>
                        <td className='px-6 py-3'>{user.name || null}</td>
                        <td className='px-6 py-3'>{user.email}</td>
                    </tr>
                </tbody>
            </table>
            <div className="my-4 h-1 bg-muted" />
            <SignOutButton />
        </>
    )
}

const SignedOut = () => {
    return (
        <>
            <h2 className='text-2xl font-bold tracking-tight'>User not signed in</h2>
            <div className='my-2 bg-muted' />

            <Button asChild>
                <Link href="/auth/sign-in">Sign In</Link>
            </Button>
        </>

    )
}