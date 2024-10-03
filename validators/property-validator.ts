import * as v from "valibot";

export const propertySchema = v.object({
    images: v.optional(
        v.array(v.string()) // Array of image URLs or paths as strings
    ),
    price: v.pipe(
        v.number(),
        v.minValue(1, "Price must be a positive value"),
    ),
    state: v.string(),
    status: v.string(),
    city: v.string(),
    streetAddress: v.string(),
    lat: v.optional(v.string()),
    lon: v.optional(v.string()),
    plots: v.optional(
        v.pipe(v.number(),
            v.minValue(1, "Number of plots must be at least 1"))
    ),
    type: v.optional(
        v.string(),
    ),
    size: v.optional(
        v.pipe(v.number(),
            v.minValue(0, "Size must be a positive value")),
    ),
    description: v.string(),
    isLand: v.boolean(),
    beds: v.optional(
        v.pipe(v.number(),
            v.minValue(0, "Beds must be a non-negative integer"))
    ),
    baths: v.optional(
        v.pipe(v.number(),
            v.minValue(0, "Baths must be a non-negative integer"))
    ),
    rooms: v.optional(
        v.pipe(v.number(),
            v.minValue(0, "Rooms must be a non-negative integer"))
    ),
    adminId: v.string(),
});



export type propertyInputValidator = v.InferInput<typeof propertySchema>;
