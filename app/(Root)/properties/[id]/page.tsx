import { auth } from "@/auth";
import PropertyListing from "@/components/PropertyListing";
import SimilarListings from "@/components/SimilarListings";
import { toggleSavedProperty } from "@/lib/actions/admin/properties.actions";
import { findPropertyById } from "@/resources/property-queries";
import { notFound } from "next/navigation";

interface PropertyPageProps {
  params: { id: string };
}

interface Property {
  id: string;
  images: string[];
  price: number;
  state: string;
  status: string;
  city: string;
  streetAddress: string;
  lat: number | null;
  lon: number | null;
  plots: number | null;
  type: string;
  size: number;
  description: string;
  isLand: boolean;
  beds?: number | null;
  baths?: number | null;
  rooms?: number | null;
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { id } = params;

  // Fetch the session
  const session = await auth();
  const user = session?.user;

  // Fetch the property data by ID
  const properties = await findPropertyById({ id });

  // Handle the case where the property is not found
  if (!properties || properties.length === 0) {
    notFound();
  }

  // Destructure the first property object from the array
  const property = properties[0];

  // Create a client-side action for toggling saved status

  return (
    <div className="container mx-auto px-4">
      <PropertyListing {...property} userId={user?.id} />

      {/* Similar Listings */}
      {/* <SimilarListings propertyType={property.type} excludeId={property.id} /> */}
      <SimilarListings />
    </div>
  );
}
