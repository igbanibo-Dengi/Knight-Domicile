import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod"


export enum USER_ROLES {
    USER = "user",
    ADMIN = "admin",
}

export const VERIFICATION_TOKEN_EXP_MIN = 10 as const;





export const formSchema = z.object({
    images: z.array(z.string()).min(5, {
        message: "At least 5 images is required.",
    }).max(5, { message: "Maximum 5 images are allowed." }),
    price: z.coerce.number().positive({ message: "Price must be a positive number." }).int().min(1, { message: "Price must be greater than 0." }),
    status: z.string({ message: "Status is required" }),
    state: z.string().min(2, { message: "State must be at least 2 characters." }),
    city: z.string().min(2, { message: "City must be at least 2 characters." }),
    streetAddress: z.string().min(5, { message: "Address must be at least 5 characters." }),
    lat: z.string().min(1, { message: "required" }),
    lon: z.string().min(1, { message: "required" }),
    plots: z.coerce.number().optional(),
    type: z.string({ message: "Type is required" }).optional(),
    size: z.coerce.number().positive({ message: "Size must be a positive number." }),
    description: z.string().min(10, { message: "Description must be at least 10 characters." }),
    isLand: z.boolean(),
    beds: z.coerce.number().int().min(0, { message: "Number of beds must be 0 or greater." }).optional(),
    baths: z.coerce.number().int().min(0, { message: "Number of baths must be 0 or greater." }).optional(),
    rooms: z.coerce.number().int().min(0, { message: "Number of rooms must be 0 or greater." }).optional(),
    adminId: z.string().uuid({ message: "Invalid admin ID." })
})



export const states = [
    { label: "Abia", value: "abia" },
    { label: "Adamawa", value: "adamawa" },
    { label: "Akwa Ibom", value: "akwa_ibom" },
    { label: "Anambra", value: "anambra" },
    { label: "Bauchi", value: "bauchi" },
    { label: "Bayelsa", value: "bayelsa" },
    { label: "Benue", value: "benue" },
    { label: "Borno", value: "borno" },
    { label: "Cross River", value: "cross river" },
    { label: "Delta", value: "delta" },
    { label: "Ebonyi", value: "ebonyi" },
    { label: "Edo", value: "edo" },
    { label: "Ekiti", value: "ekiti" },
    { label: "Enugu", value: "enugu" },
    { label: "Gombe", value: "gombe" },
    { label: "Imo", value: "imo" },
    { label: "Jigawa", value: "jigawa" },
    { label: "Kaduna", value: "kaduna" },
    { label: "Kano", value: "kano" },
    { label: "Katsina", value: "katsina" },
    { label: "Kebbi", value: "kebbi" },
    { label: "Kogi", value: "kogi" },
    { label: "Kwara", value: "kwara" },
    { label: "Lagos", value: "lagos" },
    { label: "Nasarawa", value: "nasarawa" },
    { label: "Niger", value: "niger" },
    { label: "Ogun", value: "ogun" },
    { label: "Ondo", value: "ondo" },
    { label: "Osun", value: "osun" },
    { label: "Oyo", value: "oyo" },
    { label: "Plateau", value: "plateau" },
    { label: "Rivers", value: "rivers" },
    { label: "Sokoto", value: "sokoto" },
    { label: "Taraba", value: "taraba" },
    { label: "Yobe", value: "yobe" },
    { label: "Zamfara", value: "zamfara" },
    { label: "FCT (Abuja)", value: "fedral capital territory" }
] as const;
