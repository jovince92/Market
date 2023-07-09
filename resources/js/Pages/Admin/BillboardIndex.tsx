import BillboardClient from '@/Components/Admin/Billboards/BillboardClient';
import AdminLayout from '@/Components/Layouts/Admin/AdminLayout';
import { IBillboard } from '@/types';
import { Head } from '@inertiajs/react';
import  { FC } from 'react'
import { format, parseISO } from 'date-fns'

interface BillboardIndexProps{
    billboards:IBillboard[]
}

const BillboardIndex:FC<BillboardIndexProps> = ({billboards}) => {
    return (
        <AdminLayout>
            <Head title='Billboards' />
            <div className="flex flex-col">
                <div className='flex-1 space-y-3.5 p-7 pt-5' >
                    <BillboardClient billboards={billboards.map(({created_at,...billboard})=>({...billboard,created_at:format( parseISO( created_at),'MMMM do, yyyy').toString()}))} />
                </div>
            </div>
        </AdminLayout>
    )
}

export default BillboardIndex