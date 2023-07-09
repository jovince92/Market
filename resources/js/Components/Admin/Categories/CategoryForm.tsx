import { ICategory, PageProps } from '@/types';
import React, { FC, useCallback, useMemo, useState } from 'react'


import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { router, usePage } from '@inertiajs/react';
import Heading from '@/Components/Heading';
import { Button } from '@/Components/ui/button';
import { Trash } from 'lucide-react';
import { Separator } from '@radix-ui/react-separator';
import axios from 'axios';
import { toast } from 'react-toastify';
import AlertModal from '@/Components/Modals/AlertModal';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/Components/ui/form';
import { Input } from '@/Components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
interface CategoryFormProps{
    category?:ICategory;
}


const formSchema = zod.object({
    name:zod.string().min(1),
    billboard_id:zod.number().int().gt(0,"Select a billboard")
});

type CategoryFormValues = zod.infer<typeof formSchema>


const CategoryForm:FC<CategoryFormProps> = ({category}) => {
    const {current_store} = usePage<PageProps>().props;
    const [open,setOpen]=useState(false);
    const [loading,setLoading]=useState(false);
    const form = useForm<CategoryFormValues>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            name:category?.name||"",
            billboard_id:category?.billboard_id||0
        }
    });

    const onSubmit = useCallback(()=>{
        router.post(headingTextandToast.url,{
            id:category?.id,
            store_id:current_store.id,
            billboard_id:form.getValues('billboard_id'),
            name:form.getValues('name'),
        },{
            onStart:()=>setLoading(true),
            onSuccess:()=>toast.success(headingTextandToast.toast),
            onError:(e:any)=>{
                toast.error(e.image??'Something Went Wrong');
            },
            onFinish:()=>setLoading(false),
            preserveState:false,
        });
    },[current_store.id,category?.id]);

    const onDelete = useCallback(async() =>{
        
        if(!category)return ;
        try {
            setLoading(true);
            await axios.post(route('admin.categories.delete',{store_id:current_store.id}),{id:category.id});
            toast.info('Billboard Deleted!');
            router.get(route('admin.categories.index',{store_id:current_store.id}))
        } catch (e:any) {
            toast.error('Something Went Wrong...');
            console.log(e);
        } finally{
            setLoading(false)
        }
    },[category?.id,current_store.id])


    const headingTextandToast=useMemo(()=>{
        return{
            title:category?'Edit this Category':'Add New Category',
            description:category?'Make Changes to this Category...':'Create a new Category...',
            toast:category?'Category Updated':'Category Created',
            actionText:category?'Save Changes':'Create Category',
            url:category?route('admin.categories.update',{store_id:current_store.id}):route('admin.categories.store',{store_id:current_store.id})
        }
    }
    ,[category]);
    return (
        <>
            <div className='flex items-center justify-between'>
                <Heading title={headingTextandToast.title} description={headingTextandToast.description} />
                {
                    category&&(
                        <Button variant='destructive' size='sm' disabled={loading} onClick={()=>setOpen(true)}>
                            <Trash className='h-3.5 w-3.5' />
                        </Button>
                    )
                }
                
            </div>
            <Separator />
            
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col space-y-7 w-full'>
                    <div className='grid grid-cols-3 gap-7'>
                        <FormField control={form.control} name='name' render={({field})=>(
                            <FormItem>
                                <FormLabel>Name:</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder='Category Name...' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField control={form.control} name='billboard_id' render={({field})=>(
                            <FormItem>
                                <FormLabel>Billboard:</FormLabel>
                                <Select disabled={loading} onValueChange={(e)=>field.onChange(parseInt(e))} value={field.value.toString()} defaultValue={field.value.toString()}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue  defaultValue={field.value} placeholder='Select a Billboard...' />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {
                                            current_store.billboards.map(({id,label})=> <SelectItem key={id} value={id.toString()} >{label}</SelectItem> )
                                        }
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                    <Button disabled={loading} className='ml-auto'>{headingTextandToast.actionText}</Button>
                </form>
            </Form>
            <Separator />

            <AlertModal isOpen={open} onClose={()=>setOpen(false)} onConfirm={onDelete} loading={loading} title="Delete this Category?'" description="This category will be deleted!" />
        </>
    )
}

export default CategoryForm