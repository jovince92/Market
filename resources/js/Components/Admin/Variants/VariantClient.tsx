import { IVariant, PageProps } from '@/types'
import { router, usePage } from '@inertiajs/react';
import React, { FC, useMemo } from 'react'
import { VariantColumn, columns } from './VariantColumn';
import Heading from '@/Components/Heading';
import { Button } from '@/Components/ui/button';
import { Plus } from 'lucide-react';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { DataTable } from '@/Components/DataTable';
import ApiList from '@/Components/ApiList';


interface VariantIndexProps{
    variants:IVariant[]
}


const VariantClient:FC<VariantIndexProps> = ({variants}) => {
    const {current_store} = usePage<PageProps>().props;
    const variantData:VariantColumn[]= useMemo(()=>variants.map(({id,value,created_at,name})=>({id,name,value,created_at})),
    [variants]);
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title={`Variants (${variants.length})`} description='Manage Variants...' />
                <Button onClick={()=>router.get(route('admin.variants.create',{id:current_store.id}))}>
                    <Plus className='mr-1.5 h-3.5 w-3.5' />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey='name' columns={columns} data={variantData} />
            <Heading title='API' description='API calls for this Variant...' />
            <Separator />


            
                    
            <ApiList entityName={route('api.variants',{
                store_id:current_store.id
                })} />
            <ApiList entityName={route('api.variants',{
                store_id:current_store.id
                })} entityId='variant_id' />
        </>
    )
}

export default VariantClient