import VariantClient from '@/Components/Admin/Variants/VariantClient'
import AdminLayout from '@/Components/Layouts/Admin/AdminLayout'
import { IVariant } from '@/types'
import { Head } from '@inertiajs/react'
import { format, parseISO } from 'date-fns'
import React, { FC } from 'react'


interface VariantIndexProps{
    variants:IVariant[]
}

const VariantIndex:FC<VariantIndexProps> = ({variants}) => {
    return (
        <AdminLayout>
            <Head title='Variants' />
            <div className="flex flex-col">
                <div className='flex-1 space-y-3.5 p-7 pt-5' >
                    <VariantClient variants={variants.map(({created_at,...variant})=>({...variant,created_at:format( parseISO( created_at),'MMMM do, yyyy').toString()}))} />
                </div>
            </div>
        </AdminLayout>
    )
}

export default VariantIndex