import ProductForm from '@/Components/Admin/Products/ProductForm'
import AdminLayout from '@/Components/Layouts/Admin/AdminLayout'
import { IProduct } from '@/types'
import { Head } from '@inertiajs/react'
import React, { FC } from 'react'

interface ProductEditProps{
    product:IProduct;
}

const ProductEdit:FC<ProductEditProps> = ({product}) => {
    return(
    <AdminLayout>
        <Head title='Add new Product' />
        <div className="flex flex-col">
            <div className='flex-1 space-y-3.5 p-7 pt-5' >
                <ProductForm product={product} />
            </div>
        </div>
    </AdminLayout>)
}

export default ProductEdit