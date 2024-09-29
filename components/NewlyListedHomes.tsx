import Image from 'next/image'
import { ChevronRight, Bed, Bath, Square } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from 'next/link';

const listings = [
    {
        id: 1,
        image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 1250000,
        beds: 2,
        baths: 1,
        sqft: 1776,
        address: '333-335 Herbert Macaulay Way, Yaba, Lagos, Nigeria',
        label: 'NEW - 10 HRS AGO',
        agent: 'ANH HOANG PHAM DRE #01437135, SKYGROUP REALTY INC'
    },
    {
        id: 2,
        image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 1225000,
        beds: 3,
        baths: 1,
        sqft: 1416,
        address: '1216 Awolowo Road, Ikoyi, Lagos, Nigeria',
        label: 'NEW | OPEN SUN, 3-5PM',
        agent: 'ANTHONY R. NAVARRO DRE #01491847, HARPER REAL ESTATE'
    },
    {
        id: 3,
        image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 1088000,
        beds: 4,
        baths: 2,
        sqft: 1167,
        address: '51 Adeniran Ogunsanya Street, Surulere, Lagos, Nigeria',
        label: 'NEW | OPEN SUN, 1-5PM',
        agent: 'MICHAEL BRIZZOLARA DRE #01761244, MARCH PROPERTIES'
    },
    {
        id: 4,
        image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 820000,
        beds: 1,
        baths: 1,
        sqft: 614,
        address: '1288 Aminu Kano Crescent, Wuse 2, Abuja, Nigeria',
        label: 'NEW - 14 HRS AGO',
        agent: 'MICHAEL BRIZZOLARA DRE #01761244, MARCH PROPERTIES'
    },
    {
        id: 5,
        image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 1069000,
        beds: 2,
        baths: 3,
        sqft: 1072,
        address: '1288 Opebi Road #329, Ikeja, Lagos, Nigeria',
        label: 'NEW - 15 HRS AGO',
        agent: ''
    },
    {
        id: 6,
        image: 'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 589950,
        beds: 5,
        baths: 4,
        sqft: 2940,
        address: '10121 Admiralty Way, Lekki, Lagos, Nigeria',
        label: 'NEW - 17 HRS AGO',
        agent: ''
    },
    {
        id: 7,
        image: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 599000,
        beds: 0,
        baths: 2,
        sqft: 1700,
        address: 'Address Not Disclosed, Victoria Island, Lagos, Nigeria',
        label: 'NEW | OPEN SUN, 2-4PM',
        agent: ''
    },
    {
        id: 8,
        image: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 599000,
        beds: 0,
        baths: 2,
        sqft: 1700,
        address: 'Address Not Disclosed, Victoria Island, Lagos, Nigeria',
        label: 'NEW | OPEN SUN, 2-4PM',
        agent: ''
    },
];


export default function NewlyListedHomes() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-5xl font-bold text-center mb-12 px-4">Newly Listed Properties</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {listings.map((listing) => (
                    <Link key={listing.id} href={`properties/${listing.id}`}>
                        <Card className="overflow-hidden min-h-[360px]">
                            <CardContent className="p-0">
                                <div className="relative">
                                    <Image
                                        src={listing.image}
                                        alt={`Property at ${listing.address}`}
                                        width={1260}
                                        height={750}
                                        className="w-full h-48 object-cover"
                                    />
                                    <Badge className="absolute top-2 left-2 bg-blue-600 text-white">
                                        {listing.label}
                                    </Badge>
                                </div>

                                <div className="p-4">
                                    <p className="text-2xl font-bold mb-2">₦{listing.price.toLocaleString()}</p>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                                        <span className="flex items-center"><Bed className="w-4 h-4 mr-1" />{listing.beds}bd</span>
                                        <span className="flex items-center"><Bath className="w-4 h-4 mr-1" />{listing.baths}ba</span>
                                        <span className="flex items-center"><Square className="w-4 h-4 mr-1" />{listing.sqft.toLocaleString()} sqft</span>
                                    </div>
                                    <p className="text-sm mb-2">{listing.address}</p>
                                    {listing.agent && (
                                        <p className="text-xs text-muted-foreground">{listing.agent}</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            <div className="flex justify-center mt-8">
                <button className="flex items-center text-blue-600 hover:underline">
                    View more listings <ChevronRight className="w-4 h-4 ml-1" />
                </button>
            </div>
        </div>
    )
}