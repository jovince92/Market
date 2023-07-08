import BillboardForm from '@/Components/Admin/Billboards/BillboardForm';
import AdminLayout from '@/Components/Layouts/Admin/AdminLayout';
import { IImage, PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import React, { FC } from 'react'

interface BillboardCreateProps{
    images:IImage[];
}

const BillboardCreate:FC<BillboardCreateProps> = ({images}) => {
        return (
        <AdminLayout>
            <Head title='Create Billboard' />
            <div className="flex flex-col">
                <div className='flex-1 space-y-3.5 p-7 pt-5' >
                    <BillboardForm images={images}/>
                </div>
            </div>
        </AdminLayout>
    )
}

export default BillboardCreate