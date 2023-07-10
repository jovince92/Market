import VariantForm from '@/Components/Admin/Variants/VariantForm'
import AdminLayout from '@/Components/Layouts/Admin/AdminLayout'
import { IVariant } from '@/types'
import { Head } from '@inertiajs/react'
import React, { FC } from 'react'

interface VariantEditProps{
    variant:IVariant
}

const VariantEdit:FC<VariantEditProps> = ({variant}) => {
    return (
        <AdminLayout>
            <Head title='Edit Variant' />
            <div className="flex flex-col">
                <div className='flex-1 space-y-3.5 p-7 pt-5' >
                    <VariantForm variant={variant} />
                </div>
            </div>
        </AdminLayout>
    )
}

export default VariantEdit