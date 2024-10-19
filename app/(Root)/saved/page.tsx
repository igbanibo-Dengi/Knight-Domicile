
import { auth } from '@/auth';
import DeleteButton from '@/components/DeleteAllButton';
import PropertyGrid from '@/components/PropertyGrid';
import { deleteAllSavedProperties } from '@/lib/actions/admin/properties.actions';
import { findSavedProperties } from '@/resources/property-queries';
import { revalidatePath } from 'next/cache';

const Page = async () => {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        // Handle the case when userId is undefined
        return (
            <div className='min-h-screen container pt-4'>
                <h1 className='text-lg md:text-2xl xl:text-4xl font-semibold'>Saved Homes</h1>
                <p>Please log in to view your saved properties.</p>
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
        <div className='min-h-screen container pt-4'>
            <div className='flex items-center justify-between'>
                <h1 className='text-lg md:text-2xl xl:text-4xl font-semibold'>Saved Homes</h1>
                <DeleteButton onDelete={handleDeleteAll} /> {/* Passing the callback to the DeleteButton */}
            </div>
            {properties.length > 0 ? (
                <PropertyGrid properties={properties} />
            ) : (
                <p>You have no saved properties.</p>
            )}
        </div>
    );
};

export default Page;
