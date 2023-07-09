import { ICategory, PageProps } from '@/types'
import { router, usePage } from '@inertiajs/react';
import React, { FC, useMemo } from 'react'
import { CategoryColumn, columns } from './CategoryColumn';
import Heading from '@/Components/Heading';
import { Button } from '@/Components/ui/button';
import { Plus } from 'lucide-react';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { DataTable } from '@/Components/DataTable';
import ApiList from '@/Components/ApiList';

interface CategoryClientProps{
    categories:ICategory[];
}

const CategoryClient:FC<CategoryClientProps> = ({categories}) => {
    const {current_store} = usePage<PageProps>().props;
    const categoryData:CategoryColumn[]= useMemo(()=>categories.map(({id,billboard,created_at,name})=>({id,name,billboardLabel:billboard.label,created_at})),
    [categories]);
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title={`Categories (${categories.length})`} description='Manage Categories...' />
                <Button onClick={()=>router.get(route('admin.categories.create',{id:current_store.id}))}>
                    <Plus className='mr-1.5 h-3.5 w-3.5' />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey='name' columns={columns} data={categoryData} />
            <Heading title='API' description='API calls for this Category...' />
            <Separator />


            
            
            <ApiList entityName={route('api.categories',{
                store_id:current_store.id
                })} />
            <ApiList entityName={route('api.categories',{
                store_id:current_store.id
                })} entityId='category_id' />
                
        </>
    )
}

export default CategoryClient