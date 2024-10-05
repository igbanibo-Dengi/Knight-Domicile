import { findAllProperties } from '@/resources/property-queries'
import { Suspense } from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import PropertyGrid from '@/components/PropertyGrid'
import SearchFilters from '@/components/SearchFilters'
import { MapPinHouse } from 'lucide-react'

export default function PropertiesPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8">Properties</h1>
            <SearchFilters />
            <Suspense fallback={<PropertyGridSkeleton />}>
                <PropertyList searchParams={searchParams} />
            </Suspense>
        </div>
    )
}

const PropertyGridSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {[...Array(6)].map((_, index) => (
            <Skeleton key={index} className="h-64 w-full" />
        ))}
    </div>
)

async function PropertyList({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const properties = await findAllProperties(searchParams)

    if (!properties || properties.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center mt-8 min-h-[300px] text-center">
                <MapPinHouse className='text-primary size-40' />
                <p className="text-lg font-medium">No properties found matching your criteria.</p>
                <p className="text-gray-500">Try adjusting your search or filters.</p>
            </div>
        )
    }

    return <PropertyGrid properties={properties} />
}