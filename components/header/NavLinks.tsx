import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

const NavLinks = () => {
    return (
        <div className="flex flex-col md:flex-row md:items-center gap-4 text-lg font-semibold">
            <Link href={'/'}>Explore</Link>
            <Link href={'/'}>Saved</Link>
            <Button variant={"outline"} size={"lg"} className='font-semibold' asChild>
                <Link href="/auth/sign-up">Sign Up</Link>
            </Button>
        </div>
    )
}

export default NavLinks