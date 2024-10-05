import { PropertyProp } from '@/resources/property-queries'
import PropertyCard from './PropertyCard '

interface PropertyGridProps {
    properties: PropertyProp[]
}

export default function PropertyGrid({ properties }: PropertyGridProps) {
    if (!properties || properties.length === 0) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-semibold mb-4">No properties found</h2>
                <p className="text-gray-600">Try adjusting your search criteria or check back later for new listings.</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
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
    )
}