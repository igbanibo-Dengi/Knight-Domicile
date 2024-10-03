import { findAllProperties } from '@/resources/property-queries'
import React from 'react'

const page = async () => {

    const properties = await findAllProperties()

    console.log(properties);


    return (
        <div className='container'>
            page
        </div>
    )
}

export default page