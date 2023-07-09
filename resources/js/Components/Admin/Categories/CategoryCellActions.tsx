import React, { FC, useCallback, useState } from 'react'
import { CategoryColumn } from './CategoryColumn'
import { router, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import { toast } from 'react-toastify';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu';
import { Button } from '@/Components/ui/button';
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';
import AlertModal from '@/Components/Modals/AlertModal';

interface CategoryCellActionsProps{
    data:CategoryColumn
}

const CategoryCellActions:FC<CategoryCellActionsProps> = ({data}) => {
    const [loading,setLoading] = useState(false);
    const [open,setOpen] = useState(false);
    const {current_store} = usePage<PageProps>().props;
    const onCopy = useCallback(()=>{
        navigator.clipboard.writeText(data.id.toString()); 
        toast.info('ID Copied to Clipboard!');
    },[data.id]);

    const handleDelete = useCallback(() =>{
        router.post(route('admin.categories.delete',{store_id:current_store.id}),{id:data.id},{
            onStart:()=>setLoading(true),
            onSuccess:()=>toast.info('Category Deleted!'),
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
                    <DropdownMenuItem onClick={()=>router.get(route('admin.categories.show',{store_id:current_store.id,category_id:data.id}))}>
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
            <AlertModal isOpen={open} onClose={()=>setOpen(false)} onConfirm={handleDelete} loading={loading} title="Delete this Category?'"  />
        </>
    )
}

export default CategoryCellActions