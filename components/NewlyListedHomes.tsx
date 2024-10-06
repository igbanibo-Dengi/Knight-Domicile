export const revalidate = 0


import { findLatestProperties } from "@/resources/property-queries"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Home, AlertCircle } from "lucide-react"
import { Suspense } from "react"
import PropertyCard from "./PropertyCard "
import Link from "next/link"

const PropertyCardSkeleton = () => (
    <div className="rounded-lg overflow-hidden shadow-md">
        <Skeleton className="w-full h-48" />
        <div className="p-4">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-4" />
            <div className="flex justify-between">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/4" />
            </div>
        </div>
    </div>
)

const NewlyListedHomesContent = async () => {
    try {
        const listings = await findLatestProperties()

        console.log(listings.length);


        if (!listings.length) {
            return (
                <div className="text-center py-12">
                    <Home className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h2 className="text-2xl font-semibold mb-2">No Properties Listed Yet</h2>
                    {/* <p className="text-gray-500 mb-4">Be the first to list a property!</p> */}
                    {/* <Button>Add a Property</Button> */}
                </div>
            )
        }

        return (
            <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {listings.map((listing) => (
                        <PropertyCard
                            key={listing.id}
                            id={listing.id}
                            image={listing.images[0]}
                            price={listing.price}
                            beds={listing.beds}
                            baths={listing.baths}
                            size={listing.size}
                            address={listing.streetAddress}
                            label={listing.status}
                            isLand={listing.isLand}
                            state={listing.state}
                        />
                    ))}
                </div>
                <div className="mt-8 w-fit mx-auto">
                    <Link href={"/properties"} className="my-20 text-center text-primary mx-auto w-fit">View more properties</Link>
                </div>
            </div>
        )
    } catch (error) {
        console.error("Error fetching properties:", error)
        return (
            <div className="text-center py-12">
                <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
                <h2 className="text-2xl font-semibold mb-2">Oops! Something went wrong</h2>
                <p className="text-gray-500 mb-4">We couldn&apos;t fetch the latest properties. Please try again later.</p>
                <Button onClick={() => window.location.reload()}>Retry</Button>
            </div>
        )
    }
}

const NewlyListedHomes = () => {
    return (
        <div className="bg-gray-50 py-16">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">Newly Listed Properties</h1>
                <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                    Discover the latest additions to our property listings. Find your dream home among these fresh opportunities.
                </p>
                <Suspense fallback={
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, index) => (
                            <PropertyCardSkeleton key={index} />
                        ))}
                    </div>
                }>
                    <NewlyListedHomesContent />
                </Suspense>
            </div>
        </div>
    )
}

export default NewlyListedHomes