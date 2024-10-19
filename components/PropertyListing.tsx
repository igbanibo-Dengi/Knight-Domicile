"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
    ArrowLeft,
    Share2,
    Heart,
    Bed,
    Bath,
    Square,
    MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ImageLightbox } from "./image-lightbox";
import { ImageCarousel } from "./image-carousel";
import { formatAmount } from "@/lib/utils";
import {
    isPropertySaved,
    toggleSaveProperty,
} from "@/lib/actions/admin/properties.actions";
import { useToast } from "@/hooks/use-toast";
import { PropertyListingProps } from "@/types";
import { ToastAction } from "./ui/toast";



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
    userId,
    // handleToggleSave
}: PropertyListingProps) {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [initialImageIndex, setInitialImageIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { toast } = useToast()

    const allImages = images.map((src, index) => ({
        src,
        alt: `Property image ${index + 1}`,
    }));

    const checkSavedStatus = async () => {
        if (!userId) {
            console.error("User must be logged in to save properties");
            return;
        }

        try {
            const res = await isPropertySaved(id); // Use userId and propertyId
            // console.log(res);
            if (res === true) {
                setIsSaved(res);
            }
        } catch (error) {
            console.error("Error checking property save status:", error);
        }
    };

    const handleToggleSave = async () => {
        if (!userId) {
            toast({
                variant: "destructive",
                title: "Uh oh! ",
                description: "must be signed in to save properties.",
                action: <ToastAction altText="Sign In">
                    <Link href={"/auth/sign-up"}>
                        Sign In
                    </Link>
                </ToastAction>,
            })
            console.error("User must be logged in to save properties");
            return;
        }

        try {
            setIsLoading(true);
            await toggleSaveProperty(id);
            setIsSaved((prev) => !prev); // Toggle save status directly
            setIsLoading(false);
        } catch (error) {
            console.error("Error toggling property save status:", error);
        }
    };

    useEffect(() => {
        checkSavedStatus(); // Check saved status on mount
    }, []);

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkIfMobile();
        window.addEventListener("resize", checkIfMobile);
        return () => window.removeEventListener("resize", checkIfMobile);
    }, []);

    const openLightbox = (index: number) => {
        setInitialImageIndex(index);
        setLightboxOpen(true);
    };

    return (
        <div className="container mx-auto p-4">
            <div className="mb-4 flex items-center">
                <Button variant="ghost" className="mr-auto hidden md:block">
                    <Link href={"/"} className="flex items-center gap-2">
                        <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" /> Back
                    </Link>
                </Button>
                <div className="flex w-full items-center justify-between gap-2 md:w-fit">
                    <Button size={"sm"} className="md:hidden">
                        {status}
                    </Button>
                    <div className="flex items-center gap-2">
                        <Button size="sm" variant="secondary" aria-label="Share Property">
                            <Share2 className="mr-2 h-4 w-4" />
                            Share
                        </Button>

                        <Button
                            size="sm"
                            variant="secondary"
                            aria-label="Save Property"
                            disabled={isLoading}
                            onClick={handleToggleSave}
                        >
                            <Heart fill={isSaved ? "#2563EB" : "white"} className={`mr-2 h-4 w-4 ${isSaved ? "text-primary" : ""}`} />
                            {isSaved ? "Saved" : "Save"}
                        </Button>
                    </div>
                </div>
            </div>
            {isMobile ? (
                <ImageCarousel images={allImages} onImageClick={openLightbox} />
            ) : (
                <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="relative md:col-span-2">
                        <Image
                            src={allImages[0].src}
                            alt={allImages[0].alt}
                            width={1260}
                            height={750}
                            className="h-[400px] w-full cursor-pointer rounded-lg object-cover"
                            loading="lazy"
                            onClick={() => openLightbox(0)}
                        />
                        <div className="absolute left-4 top-4 rounded bg-blue-600 px-2 py-1 text-white">
                            {status}
                        </div>
                    </div>
                    <div className="hidden grid-cols-2 gap-2 md:grid">
                        {allImages.slice(1, 5).map((img, index) => (
                            <Image
                                key={index}
                                src={img.src}
                                alt={img.alt}
                                width={400}
                                height={300}
                                className="h-[195px] w-full cursor-pointer rounded-lg object-cover"
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

            <div className="mb-6 mt-10 grid w-full grid-cols-1 items-center gap-y-4 md:grid-cols-3 md:gap-x-4">
                <div className="col-span-2 w-full">
                    <div className="flex flex-col-reverse justify-between xl:flex-row xl:items-center">
                        <h1 className="mb-2 text-lg font-bold md:text-3xl">
                            {city}, {state}
                        </h1>
                        <h2 className="mb-4 text-2xl font-bold text-primary md:text-3xl">
                            {formatAmount(price)}
                        </h2>
                    </div>
                    <p className="mb-4 text-xl">{streetAddress}</p>
                    <div className="mb-4 flex items-center space-x-4">
                        {!isLand && (
                            <div className="flex items-center gap-x-4">
                                {beds && (
                                    <span className="flex items-center">
                                        <Bed className="mr-1 h-5 w-5" /> {beds} Beds
                                    </span>
                                )}
                                {baths && (
                                    <span className="flex items-center">
                                        <Bath className="mr-1 h-5 w-5" /> {baths} Bath
                                    </span>
                                )}
                            </div>
                        )}
                        <span className="flex items-center">
                            <Square className="mr-1 h-5 w-5" /> {size} sq ft
                        </span>
                    </div>
                </div>
                <div className="h-fit rounded-lg bg-muted p-4">
                    <h2 className="mb-2 text-xl font-bold">Schedule a Tour</h2>
                    <p className="mb-4">Tour Availability: Contact for details</p>
                    <Button size="lg" className="w-full">
                        Schedule a Tour
                    </Button>
                </div>
            </div>
            <div>
                <div className="grid grid-cols-1 items-center gap-y-4 md:grid-cols-3 md:gap-x-4">
                    <div className="col-span-2 w-full">
                        {lat && lon ? (
                            <div className="relative h-[300px]">
                                <Image
                                    src="/images/map.png"
                                    alt="Map view"
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-lg"
                                />
                                <div className="absolute bottom-4 left-4 rounded-lg bg-white p-2 shadow">
                                    <MapPin className="mr-1 inline-block h-5 w-5" />
                                    {streetAddress}
                                </div>
                            </div>
                        ) : (
                            <p className="text-center text-muted-foreground">
                                Location information not available
                            </p>
                        )}

                        {/* </div> */}
                    </div>
                    <div className="flex h-fit w-full flex-col gap-4 rounded-md border p-4 text-muted-foreground md:h-[300px] xl:p-8">
                        <p className="text-center text-xl font-bold md:text-left">
                            Property Information
                        </p>
                        <span className="flex items-center justify-between">
                            <p>Square ft</p>
                            <p>{size}</p>
                        </span>
                        <span className="flex items-center justify-between">
                            <p>Type</p>
                            <p>{type}</p>
                        </span>
                        <span className="flex items-center justify-between">
                            <p>Plots</p>
                            <p>{plots}</p>
                        </span>
                    </div>
                </div>
                <div className="grid grid-cols-3">
                    <div className="col-span-3 md:col-span-2">
                        <h3 className="mb-2 mt-6 text-xl font-bold">Description</h3>
                        <p className="text-muted-foreground">{description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}