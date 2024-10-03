import PropertyListing from '@/components/PropertyListing'
import SimilarListings from '@/components/SimilarListings'
import { findPropertyById } from '@/resources/property-queries'
import { notFound } from 'next/navigation'

interface PropertyPageProps {
    params: { id: string }
}

interface Property {
    id: string
    images: string[]
    price: number
    state: string
    status: string
    city: string
    streetAddress: string
    lat: number
    lon: number
    plots: number
    type: string
    size: number
    description: string
    isLand: boolean
    beds?: number
    baths?: number
    rooms?: number
}

export default async function PropertyPage({ params }: PropertyPageProps) {
    const { id } = params

    // Fetch the property data by ID
    const properties = await findPropertyById({ id })

    // Handle the case where the property is not found
    if (!properties || properties.length === 0) {
        notFound()
    }

    // Destructure the first property object from the array
    const property = properties[0]

    return (
        <div className="container mx-auto px-4">
            <PropertyListing {...property} />

            {/* Similar Listings */}
            <SimilarListings />
        </div>
    )
}