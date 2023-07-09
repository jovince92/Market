import React, { FC, useCallback, useState } from 'react'
import { BillboardColumn } from './BillboardColumns'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu'
import { Button } from '@/Components/ui/button'
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react'
import { DropdownMenuLabel } from '@radix-ui/react-dropdown-menu'
import { toast } from 'react-toastify'
import { router, usePage } from '@inertiajs/react'
import { PageProps } from '@/types'
import AlertModal from '@/Components/Modals/AlertModal'

interface BillboardCellActionsProps{
    data:BillboardColumn
}

const BillboardCellActions:FC<BillboardCellActionsProps> = ({data}) => {
    const [loading,setLoading] = useState(false);
    const [open,setOpen] = useState(false);
    const {current_store} = usePage<PageProps>().props;
    const onCopy = useCallback(()=>{
        navigator.clipboard.writeText(data.id.toString()); 
        toast.info('ID Copied to Clipboard!');
    },[data.id]);

    
    const handleDelete = useCallback(() =>{
        router.post(route('admin.billboards.delete',{store_id:current_store.id}),{id:data.id},{
            onStart:()=>setLoading(true),
            onSuccess:()=>toast.info('Billboard Deleted!'),
            onError:(e:any)=>{
                toast.error('Something Went Wrong...');
                console.log(e);
            },
            onFinish:()=>setLoading(false),
            preserveState:false,
        });
    },[data.id])


    return (
        <>
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
                    <DropdownMenuItem onClick={()=>setOpen(true)}>
                        <Trash className='mr-1.5 h-3.5 w-3.5' /> Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <AlertModal isOpen={open} onClose={()=>setOpen(false)} onConfirm={handleDelete} loading={loading} title="Delete this Billboard?'" description="This billboard will be deleted along with all of it's categories" />
        </>
    )
}

export default BillboardCellActions