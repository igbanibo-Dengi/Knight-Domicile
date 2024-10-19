import { auth } from "@/auth";
import PropertyListing from "@/components/PropertyListing";
import SimilarListings from "@/components/SimilarListings";
import { findPropertyById } from "@/resources/property-queries";
import { notFound } from "next/navigation";

interface PropertyPageProps {
    params: { id: string };
}


export default async function PropertyPage({ params }: PropertyPageProps) {
    const { id } = params;

    const session = await auth();
    const user = session?.user;

    const properties = await findPropertyById({ id });

    // Handle the case where the property is not found
    if (!properties || properties.length === 0) {
        notFound();
    }

    // Destructure the first property object from the array
    const property = properties[0];

    return (
        <div className="container mx-auto px-4">
            <PropertyListing {...property} userId={user?.id} />

            {/* Similar Listings */}
            {/* <SimilarListings propertyType={property.type} excludeId={property.id} /> */}
            <SimilarListings />
        </div>
    );
}
