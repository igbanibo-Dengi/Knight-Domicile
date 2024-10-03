import React from 'react'
import {
    FormControl,
    FormField,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control, FieldPath } from 'react-hook-form'
import { z } from 'zod'


interface CustomInputProps {
    control: Control<z.infer<typeof formSchema>>
    name: FieldPath<z.infer<typeof formSchema>>
    label: string
    placeholder: string
    type: string
}


const CustomInput = ({ control, name, label, placeholder, type }: CustomInputProps) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <div className='form-item'>
                    <FormLabel>{label}</FormLabel>
                    <div className='flex flex-col w-full'>
                        <FormControl>
                            <Input
                                placeholder={placeholder}
                                // type={name === 'password' ? 'password' : 'text'}
                                type={type}
                                className='input-class'
                                {...field} />
                        </FormControl>
                        <FormMessage className='form-message mt-2' />
                    </div>
                </div>
            )}
        />
    )
}

export default CustomInput