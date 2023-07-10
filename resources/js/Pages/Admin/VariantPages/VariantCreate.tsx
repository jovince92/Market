import VariantForm from '@/Components/Admin/Variants/VariantForm'
import AdminLayout from '@/Components/Layouts/Admin/AdminLayout'
import { Head } from '@inertiajs/react'
import React, { FC } from 'react'

const VariantCreate:FC = () => {
    return (
        <AdminLayout>
            <Head title='Create Category' />
            <div className="flex flex-col">
                <div className='flex-1 space-y-3.5 p-7 pt-5' >
                    <VariantForm />
                </div>
            </div>
        </AdminLayout>
    )
}

export default VariantCreate