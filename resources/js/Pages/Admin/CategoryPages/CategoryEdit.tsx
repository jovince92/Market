import CategoryForm from '@/Components/Admin/Categories/CategoryForm'
import AdminLayout from '@/Components/Layouts/Admin/AdminLayout'
import { ICategory } from '@/types'
import { Head } from '@inertiajs/react'
import React, { FC } from 'react'

interface CategoryEditProps{
    category:ICategory
}

const CategoryEdit:FC<CategoryEditProps> = ({category}) => {
    return (
        <AdminLayout>
            <Head title='Edit Category' />
            <div className="flex flex-col">
                <div className='flex-1 space-y-3.5 p-7 pt-5' >
                    <CategoryForm category={category} />
                </div>
            </div>
        </AdminLayout>
    )
}

export default CategoryEdit