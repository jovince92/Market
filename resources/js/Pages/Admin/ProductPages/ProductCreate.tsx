import ProductForm from '@/Components/Admin/Products/ProductForm'
import AdminLayout from '@/Components/Layouts/Admin/AdminLayout'
import { Head } from '@inertiajs/react'
import React, { FC } from 'react'

const ProductCreate:FC = () => {
    return(
    <AdminLayout>
            <Head title='Add new Product' />
            <div className="flex flex-col">
                <div className='flex-1 space-y-3.5 p-7 pt-5' >
                    <ProductForm />
                </div>
            </div>
        </AdminLayout>)
}

export default ProductCreate