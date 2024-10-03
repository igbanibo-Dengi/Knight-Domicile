
import PropertyForm from '@/components/PropertyForm'
import { UploadButton } from '@/lib/uploadthing'
import { findUserByAuth } from '@/resources/user.queries'
import React from 'react'

const page = async () => {

    const session = await findUserByAuth()

    console.log(session.id);


    return (
        <div className='container'>
            <PropertyForm adminId={session.id} />
        </div>
    )
}

export default page