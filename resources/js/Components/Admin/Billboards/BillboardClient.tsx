import { DataTable } from '@/Components/DataTable'
import Heading from '@/Components/Heading'
import { Button } from '@/Components/ui/button'
import { Separator } from '@/Components/ui/separator'
import { IBillboard, PageProps } from '@/types'
import { router, usePage } from '@inertiajs/react'
import { Plus } from 'lucide-react'
import React, { FC, useMemo } from 'react'
import { BillboardColumn, columns } from './BillboardColumns'
import ApiList from '@/Components/ApiList'

interface BillboardClientProps{
    billboards:IBillboard[]
}

const BillboardClient:FC<BillboardClientProps> = ({billboards}) => {
    const {current_store} = usePage<PageProps>().props;
    const billboardData:BillboardColumn[] = useMemo(()=>billboards.map(({id,label,created_at})=>({id,label,created_at})),
    [billboards]);
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title={`Billboards (${billboards.length})`} description='Manage Billboards for this Store...' />
                <Button onClick={()=>router.get(route('admin.billboards.create',{id:current_store.id}))}>
                    <Plus className='mr-1.5 h-3.5 w-3.5' />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey='label' columns={columns} data={billboardData} />
            <Heading title='API' description='API calls for this Billboard...' />
            <Separator />
            <ApiList entityName={route('api.billboards',{
                store_id:current_store.id
                })} />
            <ApiList entityName={route('api.billboards',{
                store_id:current_store.id
                })} entityId='billboard_id' />
        </>
    )
}

export default BillboardClient