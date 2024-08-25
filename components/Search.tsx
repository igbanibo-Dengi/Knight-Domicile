import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'

const Search = () => {
    return (
        <div>
            <div className='flex items-center'>
                <Input type="email" placeholder="Search Location" className='text-foreground rounded-r-none text-lg h-14 focus-within:outline-none' />
                <Button className='rounded-l-none h-14'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-search"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                </Button>
            </div>
        </div>
    )
}

export default Search