// 'use client'

// import React from 'react'
// import { useRouter } from 'next/navigation'
// import { useForm } from 'react-hook-form'
// import { valibotResolver } from '@hookform/resolvers/valibot'
// import { toast } from 'react-hot-toast'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Switch } from "@/components/ui/switch"
// import {
//     Form,
//     FormControl,
//     FormDescription,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form"
// import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
// import { createProperty } from '@/lib/actions/admin/properties.actions'
// import { propertyInputValidator, propertySchema } from '@/validators/property-validator'

// export default function PropertyForm({ adminId }: { adminId: string }) {
//     const router = useRouter()

//     const form = useForm<propertyInputValidator>({
//         resolver: valibotResolver(propertySchema),
//         defaultValues: {
//             price: "",
//             state: "",
//             city: "",
//             lat: "",
//             lon: "",
//             plots: 0,
//             size: 0,
//             description: "",
//             isLand: false,
//             beds: 0,
//             baths: 0,
//             rooms: 0,
//             adminId: adminId
//         }
//     })

//     const onSubmit = async (values: propertyInputValidator) => {
//         try {
//             const result = await createProperty(values)
//             if (result.success) {
//                 toast.success('Property created successfully')
//                 router.push('/properties')
//             } else {
//                 toast.error(result.error as string)
//             }
//         } catch (error) {
//             console.error(error)
//             toast.error('An error occurred while creating the property')
//         }
//     }

//     return (
//         <Card className="w-full max-w-2xl mx-auto">
//             <CardHeader>
//                 <CardTitle>Create New Property</CardTitle>
//                 <CardDescription>Fill in the details to create a new property listing.</CardDescription>
//             </CardHeader>
//             <CardContent>
//                 <Form {...form}>
//                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <FormField
//                                 control={form.control}
//                                 name="price"
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormLabel>Price</FormLabel>
//                                         <FormControl>
//                                             <Input type="number" placeholder="Enter price" {...field} />
//                                         </FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />
//                             <FormField
//                                 control={form.control}
//                                 name="state"
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormLabel>State</FormLabel>
//                                         <FormControl>
//                                             <Input placeholder="Enter state" {...field} />
//                                         </FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />
//                             <FormField
//                                 control={form.control}
//                                 name="city"
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormLabel>City</FormLabel>
//                                         <FormControl>
//                                             <Input placeholder="Enter city" {...field} />
//                                         </FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />
//                             <FormField
//                                 control={form.control}
//                                 name="lat"
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormLabel>Latitude</FormLabel>
//                                         <FormControl>
//                                             <Input placeholder="Enter latitude" {...field} />
//                                         </FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />
//                             <FormField
//                                 control={form.control}
//                                 name="lon"
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormLabel>Longitude</FormLabel>
//                                         <FormControl>
//                                             <Input placeholder="Enter longitude" {...field} />
//                                         </FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />
//                             <FormField
//                                 control={form.control}
//                                 name="plots"
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormLabel>Number of Plots</FormLabel>
//                                         <FormControl>
//                                             <Input type="number" placeholder="Enter number of plots" {...field} />
//                                         </FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />
//                             <FormField
//                                 control={form.control}
//                                 name="size"
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormLabel>Size</FormLabel>
//                                         <FormControl>
//                                             <Input type="number" placeholder="Enter size" {...field} />
//                                         </FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />
//                             <FormField
//                                 control={form.control}
//                                 name="isLand"
//                                 render={({ field }) => (
//                                     <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
//                                         <div className="space-y-0.5">
//                                             <FormLabel className="text-base">Is Land?</FormLabel>
//                                             <FormDescription>
//                                                 Toggle if this property is land only.
//                                             </FormDescription>
//                                         </div>
//                                         <FormControl>
//                                             <Switch
//                                                 checked={field.value}
//                                                 onCheckedChange={field.onChange}
//                                             />
//                                         </FormControl>
//                                     </FormItem>
//                                 )}
//                             />
//                         </div>
//                         <FormField
//                             control={form.control}
//                             name="description"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Description</FormLabel>
//                                     <FormControl>
//                                         <Textarea placeholder="Enter property description" {...field} />
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                             <FormField
//                                 control={form.control}
//                                 name="beds"
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormLabel>Bedrooms</FormLabel>
//                                         <FormControl>
//                                             <Input type="number" placeholder="Number of bedrooms" {...field} />
//                                         </FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />
//                             <FormField
//                                 control={form.control}
//                                 name="baths"
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormLabel>Bathrooms</FormLabel>
//                                         <FormControl>
//                                             <Input type="number" placeholder="Number of bathrooms" {...field} />
//                                         </FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />
//                             <FormField
//                                 control={form.control}
//                                 name="rooms"
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormLabel>Total Rooms</FormLabel>
//                                         <FormControl>
//                                             <Input type="number" placeholder="Total number of rooms" {...field} />
//                                         </FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />
//                         </div>
//                         <FormField
//                             control={form.control}
//                             name="adminId"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Admin ID</FormLabel>
//                                     <FormControl>
//                                         <Input {...field} readOnly />
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//                         <Button type="submit" className="w-full">
//                             {form.formState.isSubmitting ? 'Creating Property...' : 'Create Property'}
//                         </Button>
//                     </form>
//                 </Form>
//             </CardContent>
//         </Card>
//     )
// }




'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { toast } from 'react-hot-toast'
import * as v from "valibot"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { createProperty } from '@/lib/actions/admin/properties.actions'


import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { convertNumberToString } from '@/lib/utils'


const formSchema = z.object({
    price: z.coerce.number().positive({ message: "Price must be a positive number." }).int().min(1, { message: "Price must be greater than 0." }),
    state: z.string().min(2, { message: "State must be at least 2 characters." }),
    city: z.string().min(2, { message: "City must be at least 2 characters." }),
    lat: z.string().optional(),
    lon: z.string().optional(),
    plots: z.coerce.number().positive({ message: "Plots must be a positive number." }).optional(),
    size: z.coerce.number().positive({ message: "Size must be a positive number." }).optional(),
    description: z.string().min(10, { message: "Description must be at least 10 characters." }),
    isLand: z.boolean(),
    beds: z.coerce.number().optional(),
    baths: z.coerce.number().optional(),
    rooms: z.coerce.number().optional(),
    adminId: z.string().uuid({ message: "Invalid admin ID." })
})

export default function PropertyForm({ adminId }: { adminId: string }) {
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            price: 0,
            state: "",
            city: "",
            lat: "",
            lon: "",
            plots: 0,
            size: 0,
            description: "",
            isLand: false,
            beds: 0,
            baths: 0,
            rooms: 0,
            adminId: adminId
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        console.log(values);


        // const newValues = {
        //     price: convertNumberToString(values.price),
        //     state: values.state,
        //     city: values.city,
        //     lat: values.lat,
        //     lon: values.lon,
        //     plots: convertNumberToString(values.plots!),
        //     size: convertNumberToString(values.size!),
        //     description: values.description,
        //     isLand: values.isLand,
        //     beds: convertNumberToString(values.beds!),
        //     baths: convertNumberToString(values.baths!),
        //     rooms: convertNumberToString(values.rooms!),
        //     adminId: values.adminId
        // }


        // console.log(newValues);



        try {
            const result = await createProperty(values)

            console.log(result);

            if (result.success) {
                toast.success('Property created successfully')
                // router.push('/properties')
            } else {
                toast.error(result.error as string)
                console.log(result.error)
            }
        } catch (error) {
            console.error(error)
            toast.error('An error occurred while creating the property')
        }
    }

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Create New Property</CardTitle>
                <CardDescription>Fill in the details to create a new property listing.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                name="size"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Size</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="Enter size" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Enter property description" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                        <FormField
                            control={form.control}
                            name="adminId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Admin ID</FormLabel>
                                    <FormControl>
                                        <Input {...field} readOnly />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">
                            {form.formState.isSubmitting ? 'Creating Property...' : 'Create Property'}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}