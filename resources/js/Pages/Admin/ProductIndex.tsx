import ProductClient from '@/Components/Admin/Products/ProductClient'
import AdminLayout from '@/Components/Layouts/Admin/AdminLayout'
import { IProduct } from '@/types';
import { Head } from '@inertiajs/react'
import { format, parseISO } from 'date-fns';
import React, { FC } from 'react'


interface ProductIndexProps{
    products:IProduct[];
}

const ProductIndex:FC<ProductIndexProps> = ({products}) => {
    return (
        <AdminLayout>
            <Head title='Products' />
            <div className="flex flex-col">
                <div className='flex-1 space-y-3.5 p-7 pt-5' >
                    <ProductClient products={products.map(({created_at,...variant})=>({...variant,created_at:format( parseISO( created_at),'MMMM do, yyyy').toString()}))} />
                </div>
            </div>
        </AdminLayout>
    )
}

export default ProductIndex