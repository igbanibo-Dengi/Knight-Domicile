import { PropertyProp } from "@/resources/property-queries";
import PropertyCard from "./PropertyCard ";

interface PropertyGridProps {
  properties: PropertyProp[];
}

export default function PropertyGrid({ properties }: PropertyGridProps) {
  if (!properties || properties.length === 0) {
    return (
      <div className="py-12 text-center">
        <h2 className="mb-4 text-2xl font-semibold">No properties found</h2>
        <p className="text-gray-600">
          Try adjusting your search criteria or check back later for new
          listings.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          id={property.id}
          image={property.images[0]}
          price={property.price}
          beds={property.beds}
          baths={property.baths}
          size={property.size}
          address={property.streetAddress}
          label={property.status}
          isLand={property.isLand}
          state={property.state}
        />
      ))}
    </div>
  );
}
