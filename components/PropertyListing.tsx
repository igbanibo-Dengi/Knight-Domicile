import Image from 'next/image'
import { ArrowLeft, Share2, Heart, Bed, Bath, Square, MapPin } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import propertyData from './mockData';

export default function PropertyListing() {
    const {
        mainImage,
        additionalImages,
        location,
        description,
        propertyInfo,
        tourInfo
    } = propertyData;  // Destructure the data

    return (
        <div className="container mx-auto p-4">
            <div className="flex items-center mb-4">
                <Button variant="ghost" className="mr-auto">
                    <Link href={"/"} className='flex items-center gap-2'>
                        <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" /> Back to Search
                    </Link>
                </Button>
                <Button variant="ghost" className="mr-2">For Sale</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="md:col-span-2 relative">
                    <Image
                        src={mainImage.src}
                        alt={mainImage.alt}
                        width={1260}
                        height={750}
                        className="w-full h-[400px] object-cover rounded-lg"
                    />
                    <div className="absolute top-4 left-4 bg-blue-600 text-white px-2 py-1 rounded">FOR SALE</div>
                    <div className="absolute top-4 right-4 flex space-x-2">
                        <Button size="sm" variant="secondary" aria-label="Share Property"><Share2 className="h-4 w-4 mr-1" /> Share</Button>
                        <Button size="sm" variant="secondary" aria-label="Save Property"><Heart className="h-4 w-4 mr-1" /> Save</Button>
                    </div>
                </div>
                <div className="hidden md:grid grid-cols-2 gap-2">
                    {additionalImages.map((img, index) => (
                        <Image
                            key={index}
                            src={img.src}
                            alt={img.alt}
                            width={400}
                            height={300}
                            className="w-full h-[195px] object-cover rounded-lg"
                        />
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 items-center w-full mb-6">
                <div className='w-full col-span-2'>
                    <div className='flex items-center justify-between'>
                        <h1 className="text-3xl font-bold mb-2">29 Park Dr</h1>
                        <h2 className="text-3xl font-bold mb-4">$75,000</h2>
                    </div>
                    <p className="text-xl mb-4">{location}</p>
                    <div className="flex items-center space-x-4 mb-4">
                        <span className="flex items-center"><Bed className="mr-1 h-5 w-5" /> 2 Beds</span>
                        <span className="flex items-center"><Bath className="mr-1 h-5 w-5" /> 1 Bath</span>
                        <span className="flex items-center"><Square className="mr-1 h-5 w-5" /> {propertyInfo.squareFeet}</span>
                    </div>
                </div>
                <div className="bg-muted rounded-lg p-4 h-fit">
                    <h2 className="text-xl font-bold mb-2">Schedule a Tour</h2>
                    <p className="mb-4">Tour Availability: {tourInfo.tourAvailability}</p>
                    <Button size="lg" className='w-full' >Schedule a Tour</Button>
                </div>
            </div>
            <div>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 items-center'>
                    <div className="w-full col-span-2">
                        <div className="h-[300px] relative">
                            <Image
                                src="/images/map.png"
                                alt="Map view"
                                layout="fill"
                                objectFit="cover"
                                className="rounded-lg"
                            />
                            <div className="absolute bottom-4 left-4 bg-white p-2 rounded-lg shadow">
                                <MapPin className="h-5 w-5 inline-block mr-1" />
                                29 Park Dr
                            </div>
                        </div>
                    </div>
                    <div className='border p-4 xl:p-8 rounded-md text-muted-foreground flex flex-col gap-4 h-fit md:h-[300px] w-full'>
                        <p className='text-xl font-bold text-center md:text-left'>Property Information</p>
                        <span className='flex items-center justify-between'>
                            <p>Square ft</p>
                            <p>{propertyInfo.squareFeet}</p>
                        </span>
                        <span className='flex items-center justify-between'>
                            <p>Price per sq ft</p>
                            <p>{propertyInfo.pricePerSquareFeet}</p>
                        </span>
                        <span className='flex items-center justify-between'>
                            <p>Outdoor</p>
                            <p>{propertyInfo.outdoor}</p>
                        </span>
                        <span className='flex items-center justify-between'>
                            <p>AC</p>
                            <p>{propertyInfo.ac}</p>
                        </span>
                    </div>
                </div>
                <div className='grid grid-cols-3'>
                    <div className='col-span-3 md:col-span-2'>
                        <h3 className="text-xl font-bold mt-6 mb-2">Description</h3>
                        <p className="text-muted-foreground">
                            {description}
                        </p>
                    </div>
                </div>
            </div>


        </div>
    )
}
