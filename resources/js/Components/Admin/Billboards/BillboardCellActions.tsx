import React, { FC, useCallback } from 'react'
import { BillboardColumn } from './BillboardColumns'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu'
import { Button } from '@/Components/ui/button'
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react'
import { DropdownMenuLabel } from '@radix-ui/react-dropdown-menu'
import { toast } from 'react-toastify'
import { router, usePage } from '@inertiajs/react'
import { PageProps } from '@/types'

interface BillboardCellActionsProps{
    data:BillboardColumn
}

const BillboardCellActions:FC<BillboardCellActionsProps> = ({data}) => {

    const {current_store} = usePage<PageProps>().props;
    const onCopy = useCallback(()=>{
        navigator.clipboard.writeText(data.id.toString()); 
        toast.info('ID Copied to Clipboard!');
    },[data.id])


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='h-7 w-7 p-0'>
                    <span className='sr-only'>Open Menu</span>
                    <MoreHorizontal className='h-3.5 w-3.5' />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={()=>router.get(route('admin.billboards.show',{store_id:current_store.id,billboard_id:data.id}))}>
                    <Edit className='mr-1.5 h-3.5 w-3.5' /> Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onCopy}>
                    <Copy className='mr-1.5 h-3.5 w-3.5' /> Copy ID
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Trash className='mr-1.5 h-3.5 w-3.5' /> Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default BillboardCellActions