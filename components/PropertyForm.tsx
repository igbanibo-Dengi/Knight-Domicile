'use client'

import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { createProperty } from '@/lib/actions/admin/properties.actions'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useToast } from '@/hooks/use-toast'
import { FileUploader } from './FileUploader'
import { Progress } from "@/components/ui/progress"
import { Loader2, MapPin } from "lucide-react"
import { useUploadThing } from '@/lib/uploadthing'

const formSchema = z.object({
    images: z.array(z.string()).min(5, {
        message: "At least 5 images is required.",
    }),
    price: z.coerce.number().positive({ message: "Price must be a positive number." }).int().min(1, { message: "Price must be greater than 0." }),
    status: z.string({ message: "Status is required" }),
    state: z.string().min(2, { message: "State must be at least 2 characters." }),
    city: z.string().min(2, { message: "City must be at least 2 characters." }),
    streetAddress: z.string().min(5, { message: "Address must be at least 5 characters." }),
    lat: z.string().optional(),
    lon: z.string().optional(),
    plots: z.coerce.number().optional(),
    type: z.string({ message: "Type is required" }).optional(),
    size: z.coerce.number().positive({ message: "Size must be a positive number." }).optional(),
    description: z.string().min(10, { message: "Description must be at least 10 characters." }),
    isLand: z.boolean(),
    beds: z.coerce.number().int().min(0, { message: "Number of beds must be 0 or greater." }).optional(),
    baths: z.coerce.number().int().min(0, { message: "Number of baths must be 0 or greater." }).optional(),
    rooms: z.coerce.number().int().min(0, { message: "Number of rooms must be 0 or greater." }).optional(),
    adminId: z.string().uuid({ message: "Invalid admin ID." })
})

export default function PropertyForm({ adminId }: { adminId: string }) {
    const router = useRouter()
    const { toast } = useToast()
    const [files, setFiles] = useState<File[]>([])
    const [isLand, setIsLand] = useState(false)
    const [progress, setProgress] = useState(0)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            images: [],
            price: 0,
            status: "sale",
            state: "",
            city: "",
            streetAddress: "",
            lat: "",
            lon: "",
            plots: 1,
            type: "residential",
            size: 0,
            description: "",
            isLand: false,
            beds: 0,
            baths: 0,
            rooms: 0,
            adminId: adminId
        }
    })

    const { startUpload } = useUploadThing('imageUploader')

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setProgress(0)
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 90) {
                    clearInterval(interval)
                    return 90
                }
                return prev + 10
            })
        }, 500)

        try {
            let uploadedImageUrls = values.images;

            if (files.length > 0) {
                const uploadedImages = await startUpload(files)
                if (!uploadedImages) {
                    throw new Error("Failed to upload images")
                }
                uploadedImageUrls = uploadedImages.map(img => img.url)
            }

            const propertyData = {
                ...values,
                images: uploadedImageUrls
            }

            const result = await createProperty(propertyData)

            clearInterval(interval)
            setProgress(100)

            if (result.success) {
                toast({
                    title: "Property created successfully.",
                    description: "You will be redirected shortly.",
                })
                setTimeout(() => router.push('/properties'), 2000)
            } else {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "There was a problem with your request.",
                })
                console.error(result.error)
            }
        } catch (error) {
            clearInterval(interval)
            setProgress(0)
            console.error(error)
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: error instanceof Error ? error.message : "There was a problem with your request.",
            })
        }
    }

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Create New Property</CardTitle>
                <CardDescription>Fill in the details to create a new property listing.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="images"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Property Images</FormLabel>
                                    <FormControl>
                                        <FileUploader
                                            onFieldChange={field.onChange}
                                            images={field.value}
                                            setFiles={setFiles}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Price</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="Enter price" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Status</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="sale">For Sale</SelectItem>
                                                <SelectItem value="rent">For Rent</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Location Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="state"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>State</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter state" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="city"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>City</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter city" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="streetAddress"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Street Address</FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="Enter Street Address" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="lat"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Latitude</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter latitude" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="lon"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Longitude</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter longitude" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Property Details</h3>
                            <FormField
                                control={form.control}
                                name="isLand"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">Is Land?</FormLabel>
                                            <FormDescription>
                                                Toggle if this property is land only.
                                            </FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={(checked) => {
                                                    field.onChange(checked);
                                                    setIsLand(checked);
                                                }}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="size"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Size (sq ft)</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="Enter size" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {isLand ? (
                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="plots"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Number of Plots</FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="Enter number of plots" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="type"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Land Type</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={"residential"}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select land type" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="residential">Residential</SelectItem>
                                                        <SelectItem value="commercial">Commercial</SelectItem>
                                                        <SelectItem value="agricultural">Agricultural</SelectItem>
                                                        <SelectItem value="mixed-use">Mixed-use</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="beds"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Bedrooms</FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="Number of bedrooms" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="baths"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Bathrooms</FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="Number of bathrooms" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="rooms"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Total Rooms</FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="Total number of rooms" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            )}
                        </div>

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Enter property description"
                                            className="min-h-[100px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <input type="hidden" {...form.register("adminId")} />

                    </form>
                </Form>
            </CardContent>
            <CardFooter>
                <Button
                    type="submit"
                    className="w-full"
                    onClick={form.handleSubmit(onSubmit)}
                    disabled={form.formState.isSubmitting}
                >
                    {form.formState.isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating Property...
                        </>
                    ) : (
                        'Create Property'
                    )}
                </Button>
            </CardFooter>
            {progress > 0 && (
                <Progress value={progress} className="w-full" />
            )}
        </Card>
    )
}