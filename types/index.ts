export interface PropertyListingProps {
    id: string;
    images: string[];
    price: string;
    state: string;
    status: string;
    city: string;
    streetAddress: string;
    lat: string | null;
    lon: string | null;
    plots: number | null;
    type: string;
    size: string | null;
    description: string;
    isLand: boolean | null;
    beds?: number | null;
    baths?: number | null;
    rooms?: number | null;
    userId: string | undefined;
}