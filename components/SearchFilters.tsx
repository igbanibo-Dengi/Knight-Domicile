"use client"

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import * as Slider from '@radix-ui/react-slider'
import { states } from '@/lib/constants'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function SearchFilters() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
    const [priceRange, setPriceRange] = useState([
        Number(searchParams.get('minPrice')) || 0,
        Number(searchParams.get('maxPrice')) || 10000000
    ])
    const [selectedState, setSelectedState] = useState(searchParams.get('state') || 'all')

    useEffect(() => {
        const params = new URLSearchParams(searchParams)

        if (searchTerm) params.set('search', searchTerm)
        else params.delete('search')

        params.set('minPrice', priceRange[0].toString())
        params.set('maxPrice', priceRange[1].toString())

        if (selectedState && selectedState !== 'all') params.set('state', selectedState)
        else params.delete('state')

        router.replace(`/properties?${params.toString()}`)
    }, [searchTerm, priceRange, selectedState, router, searchParams])

    const handleSearch = () => {
        const params = new URLSearchParams(searchParams)
        if (searchTerm) params.set('search', searchTerm)
        else params.delete('search')
        params.set('minPrice', priceRange[0].toString())
        params.set('maxPrice', priceRange[1].toString())
        if (selectedState && selectedState !== 'all') params.set('state', selectedState)
        else params.delete('state')
        router.replace(`/properties?${params.toString()}`)
    }

    const handlePriceChange = (values: number[]) => {
        setPriceRange(values)
    }

    return (
        <div className="bg-muted p-6 rounded-lg mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="search">Search</Label>
                    <Input
                        id="search"
                        placeholder="Search by location or property name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="price-range">Price Range</Label>
                    <Slider.Root
                        className="relative flex items-center select-none touch-none w-full h-5"
                        value={priceRange}
                        onValueChange={handlePriceChange}
                        min={0}
                        max={10000000}
                        step={10000}
                        minStepsBetweenThumbs={1}
                    >
                        <Slider.Track className="bg-slate-200 relative grow rounded-full h-[3px]">
                            <Slider.Range className="absolute bg-primary rounded-full h-full" />
                        </Slider.Track>
                        <Slider.Thumb
                            className="block w-5 h-5 bg-white shadow-md rounded-full hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-primary"
                            aria-label="Min price"
                        />
                        <Slider.Thumb
                            className="block w-5 h-5 bg-white shadow-md rounded-full hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-primary"
                            aria-label="Max price"
                        />
                    </Slider.Root>
                    <div className="flex justify-between mt-2 text-sm">
                        <span>Min: ₦{priceRange[0].toLocaleString()}</span>
                        <span>Max: ₦{priceRange[1].toLocaleString()}</span>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Select value={selectedState} onValueChange={setSelectedState}>
                        <SelectTrigger id="state">
                            <SelectValue placeholder="Select a state" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All States</SelectItem>
                            {states.map((state) => (
                                <SelectItem key={state.value} value={state.value}>
                                    {state.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="md:col-span-2 lg:col-span-3">
                    <Button className="w-full" onClick={handleSearch}>Search</Button>
                </div>
            </div>
        </div>
    )
}