import PropertyListing from '@/components/PropertyListing'
import SimilarListings from '@/components/SimilarListings'
import React from 'react'

const page = () => {
    return (
        <div>
            <PropertyListing />
            <SimilarListings />
        </div>
    )
}

export default page