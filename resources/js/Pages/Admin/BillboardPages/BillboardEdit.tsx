import BillboardForm from '@/Components/Admin/Billboards/BillboardForm';
import AdminLayout from '@/Components/Layouts/Admin/AdminLayout';
import { IBillboard, IImage } from '@/types';
import { Head } from '@inertiajs/react';
import React, { FC } from 'react'



interface BillboardCreateProps{
    images:IImage[];
    billboard:IBillboard
}

const BillboardEdit:FC<BillboardCreateProps> = ({images,billboard}) => {
        return (
        <AdminLayout>
            <Head title='Edit Billboard' />
            <div className="flex flex-col">
                <div className='flex-1 space-y-3.5 p-7 pt-5' >
                    <BillboardForm images={images} billboard={billboard}/>
                </div>
            </div>
        </AdminLayout>
    )
}

export default BillboardEdit