import CategoryClient from '@/Components/Admin/Categories/CategoryClient';
import AdminLayout from '@/Components/Layouts/Admin/AdminLayout'
import { ICategory } from '@/types'
import { Head } from '@inertiajs/react'
import React, { FC } from 'react'

interface CategoryIndexProps{
    categories:ICategory[];
}

const CategoryIndex:FC<CategoryIndexProps> = ({categories}) => {
    
    return (
        <AdminLayout>
            <Head title='Categories' />
            <div className="flex flex-col">
                <div className='flex-1 space-y-3.5 p-7 pt-5' >
                    <CategoryClient categories={categories} />
                </div>
            </div>
        </AdminLayout>
    )
}

export default CategoryIndex