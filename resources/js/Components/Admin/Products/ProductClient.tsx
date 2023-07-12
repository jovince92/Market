import { IProduct, PageProps } from '@/types'
import { router, usePage } from '@inertiajs/react';
import React, { FC, useMemo } from 'react'
import { ProductColumn, columns } from './ProductColumn';
import ApiList from '@/Components/ApiList';
import Heading from '@/Components/Heading';
import { Button } from '@/Components/ui/button';
import { Plus } from 'lucide-react';
import { Separator } from '@/Components/ui/separator';
import { DataTable } from '@/Components/DataTable';

interface ProductClientProps{
    products:IProduct[];
}

const ProductClient:FC<ProductClientProps> = ({products}) => {
    const {current_store} = usePage<PageProps>().props;
    const productData:ProductColumn[]= useMemo(()=>products.map(({id,name,price,category,created_at})=>({category:category.name,id,name,price,created_at})),
    [products]);
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title={`Products (${products.length})`} description='Manage Products...' />
                <Button onClick={()=>router.get(route('admin.products.create',{id:current_store.id}))}>
                    <Plus className='mr-1.5 h-3.5 w-3.5' />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey='name' columns={columns} data={productData} />
            <Heading title='API' description='API calls for Products...' />
            <Separator />


            
{/*                     
            <ApiList entityName={route('api.variants',{
                store_id:current_store.id
                })} />
            <ApiList entityName={route('api.variants',{
                store_id:current_store.id
                })} entityId='variant_id' /> */}
        </>
    )
}

export default ProductClient