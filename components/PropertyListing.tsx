'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ArrowLeft, Share2, Heart, Bed, Bath, Square, MapPin } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { ImageLightbox } from './image-lightbox'
import { ImageCarousel } from './image-carousel'
import { formatAmount } from '@/lib/utils'
import { saveProperty, unSaveProperty } from '@/lib/actions/admin/properties.actions'

interface PropertyListingProps {
    id: string
    images: string[]
    price: string
    state: string
    status: string
    city: string
    streetAddress: string
    lat: string | null
    lon: string | null
    plots: number | null
    type: string
    size: string | null
    description: string
    isLand: boolean | null
    beds?: number | null
    baths?: number | null
    rooms?: number | null
    userId: string | undefined
    // handleToggleSave: () => Promise<void>
}

export default function PropertyListing({
    id,
    images,
    price,
    state,
    status,
    city,
    streetAddress,
    lat,
    lon,
    plots,
    type,
    size,
    description,
    isLand,
    beds,
    baths,
    rooms,
    userId
    // handleToggleSave
}: PropertyListingProps) {
    const [lightboxOpen, setLightboxOpen] = useState(false)
    const [initialImageIndex, setInitialImageIndex] = useState(0)
    const [isMobile, setIsMobile] = useState(false)

    const allImages = images.map((src, index) => ({ src, alt: `Property image ${index + 1}` }))


    const handleToggleSave = async () => {
        if (!userId) {
            // Handle the case where the user is not logged in
            console.error('User must be logged in to save properties')
            return
        }

        try {
            const result = await saveProperty(id)
        } catch (error) {
            console.error('Error toggling property save status:', error)
        }
    }

    const handleUnSave = async () => {
        if (!userId) {
            // Handle the case where the user is not logged in
            console.error('User must be logged in to unsave properties')
            return
        }

        try {
            const result = await unSaveProperty(id)
        } catch (error) {
            console.error('Error toggling property save status:', error)
        }
    }

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }
        checkIfMobile()
        window.addEventListener('resize', checkIfMobile)
        return () => window.removeEventListener('resize', checkIfMobile)
    }, [])

    const openLightbox = (index: number) => {
        setInitialImageIndex(index)
        setLightboxOpen(true)
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex items-center mb-4">
                <Button variant="ghost" className="mr-auto hidden md:block">
                    <Link href={"/"} className='flex items-center gap-2'>
                        <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" /> Back
                    </Link>
                </Button>
                <div className="flex items-center gap-2 justify-between w-full md:w-fit">
                    <Button size={"sm"} className='md:hidden'>{status}</Button>
                    <div className='flex items-center gap-2'>
                        <Button size="sm" variant="secondary" aria-label="Share Property"><Share2 className="h-4 w-4 mr-2" /> Share</Button>
                        <Button size="sm" variant="secondary" aria-label="Save Property" onClick={handleToggleSave}><Heart className="h-4 w-4 mr-2" /> Save</Button>
                    </div>
                </div>
            </div>
            {isMobile ? (
                <ImageCarousel images={allImages} onImageClick={openLightbox} />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="md:col-span-2 relative">
                        <Image
                            src={allImages[0].src}
                            alt={allImages[0].alt}
                            width={1260}
                            height={750}
                            className="w-full h-[400px] object-cover rounded-lg cursor-pointer"
                            loading="lazy"
                            onClick={() => openLightbox(0)}
                        />
                        <div className="absolute top-4 left-4 bg-blue-600 text-white px-2 py-1 rounded">{status}</div>
                    </div>
                    <div className="hidden md:grid grid-cols-2 gap-2">
                        {allImages.slice(1, 5).map((img, index) => (
                            <Image
                                key={index}
                                src={img.src}
                                alt={img.alt}
                                width={400}
                                height={300}
                                className="w-full h-[195px] object-cover rounded-lg cursor-pointer"
                                onClick={() => openLightbox(index + 1)}
                            />
                        ))}
                    </div>
                </div>
            )}
            <ImageLightbox
                images={allImages}
                initialIndex={initialImageIndex}
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 items-center w-full mb-6 mt-10">
                <div className='w-full col-span-2'>
                    <div className='flex flex-col-reverse xl:flex-row xl:items-center justify-between'>
                        <h1 className="text-lg md:text-3xl font-bold mb-2">{city}, {state}</h1>
                        <h2 className="text-2xl text-primary md:text-3xl font-bold mb-4">{formatAmount(price)}</h2>
                    </div>
                    <p className="text-xl mb-4">{streetAddress}</p>
                    <div className="flex items-center space-x-4 mb-4">
                        {!isLand && (
                            <div className='flex items-center gap-x-4'>
                                {beds && <span className="flex items-center"><Bed className="mr-1 h-5 w-5" /> {beds} Beds</span>}
                                {baths && <span className="flex items-center"><Bath className="mr-1 h-5 w-5" /> {baths} Bath</span>}
                            </div>
                        )}
                        <span className="flex items-center"><Square className="mr-1 h-5 w-5" /> {size} sq ft</span>
                    </div>
                </div>
                <div className="bg-muted rounded-lg p-4 h-fit">
                    <h2 className="text-xl font-bold mb-2">Schedule a Tour</h2>
                    <p className="mb-4">Tour Availability: Contact for details</p>
                    <Button size="lg" className='w-full'>Schedule a Tour</Button>
                </div>
            </div>
            <div>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 items-center'>
                    <div className="w-full col-span-2">
                        {lat && lon ? (
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
                                    {streetAddress}
                                </div>
                            </div>
                        ) : (
                            <p className="text-center text-muted-foreground">Location information not available</p>
                        )}

                        {/* </div> */}
                    </div>
                    <div className='border p-4 xl:p-8 rounded-md text-muted-foreground flex flex-col gap-4 h-fit md:h-[300px] w-full'>
                        <p className='text-xl font-bold text-center md:text-left'>Property Information</p>
                        <span className='flex items-center justify-between'>
                            <p>Square ft</p>
                            <p>{size}</p>
                        </span>
                        <span className='flex items-center justify-between'>
                            <p>Type</p>
                            <p>{type}</p>
                        </span>
                        <span className='flex items-center justify-between'>
                            <p>Plots</p>
                            <p>{plots}</p>
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