import { auth } from '@/auth';
import DeleteButton from '@/components/DeleteAllButton';
import PropertyGrid from '@/components/PropertyGrid';
import { deleteAllSavedProperties } from '@/lib/actions/admin/properties.actions';
import { findSavedProperties } from '@/resources/property-queries';
import { revalidatePath } from 'next/cache';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Home, LogIn } from 'lucide-react'
import Link from 'next/link'

const Page = async () => {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        return (
            <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-center">Saved Homes</CardTitle>
                        <CardDescription className="text-center">
                            Please log in to view your saved properties.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                        <Button asChild>
                            <Link href="/login">
                                <LogIn className="mr-2 h-4 w-4" /> Log In
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const properties = await findSavedProperties({ userId });

    // Handle the deletion of all saved properties
    const handleDeleteAll = async () => {
        "use server"; // Marking it as a server action
        await deleteAllSavedProperties();
        revalidatePath('/saved-homes'); // Revalidate the current path
    };

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8">
                <h1 className="text-3xl font-bold mb-4 md:mb-0">
                    <Home className="inline-block mr-2 h-8 w-8" />
                    Saved Homes
                </h1>
                {properties.length > 0 && (
                    <DeleteButton onDelete={handleDeleteAll} />
                )}
            </div>
            {properties.length > 0 ? (
                <PropertyGrid properties={properties} />
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle>No Saved Properties</CardTitle>
                        <CardDescription>
                            You haven't saved any properties yet. Start browsing to find your dream home!
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild>
                            <Link href="/properties">Browse Properties</Link>
                        </Button>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default Page;

// Add this loading state component
export function Loading() {
    return (
        <div className="container mx-auto px-4 py-8 min-h-screen">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8">
                <Skeleton className="h-10 w-48 mb-4 md:mb-0" />
                <Skeleton className="h-10 w-32" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <Card key={i}>
                        <CardHeader>
                            <Skeleton className="h-4 w-2/3 mb-2" />
                            <Skeleton className="h-4 w-1/2" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-[200px] w-full mb-4" />
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-2/3" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}