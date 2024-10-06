"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search as SearchIcon } from 'lucide-react'

export default function Search() {
    const [searchTerm, setSearchTerm] = useState('')
    const router = useRouter()

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchTerm.trim()) {
            router.push(`/properties?search=${encodeURIComponent(searchTerm.trim())}`)
        }
    }

    return (
        <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center space-x-2 px-8 lg:px-0">
            <Input
                type="text"
                placeholder="Search Location"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow placeholder:text-muted-foreground text-muted-foreground"
            />
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                <SearchIcon className="h-4 w-4 mr-2" />
                <p className='hidden lg:block'>
                    Search
                </p>
            </Button>
        </form>
    )
}