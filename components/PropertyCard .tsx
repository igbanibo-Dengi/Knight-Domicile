// components/PropertyCard.tsx
import Image from 'next/image';
import { Bed, Bath, Square } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';
import { formatAmount } from '@/lib/utils';

export interface PropertyCardProps {
    id: string;
    image: string;
    price: string;
    beds: number | null;
    baths: number | null;
    size: string | null;
    address: string;
    state: string;
    label: string;
    isLand: boolean | null
}

const PropertyCard: React.FC<PropertyCardProps> = ({ id, image, price, beds, baths, size, address, state, label, isLand }) => {



    return (
        <Link href={`properties/${id}`}>
            <Card className="overflow-hidden min-h-[360px]">
                <CardContent className="p-0">
                    <div className="relative">
                        <Image
                            src={image}
                            alt={`Property at ${address}`}
                            width={1260}
                            height={750}
                            className="w-full h-48 object-cover"
                        />
                        <Badge className="absolute top-2 left-2 bg-blue-600 text-white">
                            {label}
                        </Badge>
                    </div>
                    <div className="p-4">
                        <p className="text-2xl font-bold mb-2">{formatAmount(price)}</p>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                            {!isLand && (
                                <div className='flex items-center gap-4'>
                                    <span className="flex items-center">
                                        <Bed className="w-4 h-4 mr-1" />
                                        {beds} bd
                                    </span>
                                    <span className="flex items-center">
                                        <Bath className="w-4 h-4 mr-1" />
                                        {baths} ba
                                    </span>
                                </div>
                            )}

                            <span className="flex items-center"><Square className="w-4 h-4 mr-1" />{size?.toLocaleString()} sqft</span>
                        </div>
                        <p className="text-xs capitalize">{address}</p>
                        <p className="capitalize text-base">{state}</p>

                    </div>
                </CardContent>
            </Card>
        </Link>
    );
};

export default PropertyCard;
