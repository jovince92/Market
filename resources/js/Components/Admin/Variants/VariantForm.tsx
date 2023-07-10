import { IStore, IVariant, PageProps } from '@/types';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { router, usePage } from '@inertiajs/react';
import { toast } from 'react-toastify';
import axios from 'axios';
import Heading from '@/Components/Heading';
import { Button } from '@/Components/ui/button';
import { Trash } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/Components/ui/form';
import { Input } from '@/Components/ui/input';
import AlertModal from '@/Components/Modals/AlertModal';
import { Separator } from '@/Components/ui/separator';


interface CategoryFormProps{
    variant?:IVariant;
}



const formSchema = zod.object({
    name:zod.string().min(1),
    value:zod.string().min(1),
});

type VariantFormValues = zod.infer<typeof formSchema>


const VariantForm:FC<CategoryFormProps> = ({variant}) => {
    const {current_store} = usePage<PageProps>().props;
    const [open,setOpen]=useState(false);
    const [loading,setLoading]=useState(false);
    const form = useForm<VariantFormValues>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            name:variant?.name||"",
            value:variant?.value||"",
        }
    });


    const onSubmit = useCallback(()=>{
        router.post(headingTextandToast.url,{
            id:variant?.id,
            store_id:current_store.id,
            name:form.getValues('name'),
            value:form.getValues('value'),
        },{
            onStart:()=>setLoading(true),
            onSuccess:()=>toast.success(headingTextandToast.toast),
            onError:(e:any)=>{
                toast.error('Something Went Wrong');
            },
            onFinish:()=>setLoading(false),
            preserveState:false,
        });
    },[current_store.id,variant?.id]);

    const onDelete = useCallback(async() =>{
        
        if(!variant)return ;
        try {
            setLoading(true);
            await axios.post(route('admin.variants.delete',{store_id:current_store.id}),{id:variant.id});
            toast.info('Variant Deleted!');
            router.get(route('admin.variants.index',{store_id:current_store.id}))
        } catch (e:any) {
            toast.error('Something Went Wrong...');
            console.log(e);
        } finally{
            setLoading(false)
        }
    },[variant?.id,current_store.id])


    const headingTextandToast=useMemo(()=>{
        return{
            title:variant?'Edit this Variant':'Add New Variant',
            description:variant?'Make Changes to this Variant...':'Create a new Variant...',
            toast:variant?'Variant Updated':'Variant Created',
            actionText:variant?'Save Changes':'Create Variant',
            url:variant?route('admin.variants.update',{store_id:current_store.id}):route('admin.variants.store',{store_id:current_store.id})
        }
    }
    ,[variant]);

    

    return (
        <>
            <div className='flex items-center justify-between'>
                <Heading title={headingTextandToast.title} description={headingTextandToast.description} />
                {
                    variant&&(
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
                                    <Input disabled={loading} placeholder='Variant Name...' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField control={form.control} name='value' render={({field})=>(
                            <FormItem>
                                <FormLabel>Name:</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder='Variant Value...' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                    <Button type='submit' disabled={loading} className='ml-auto'>{headingTextandToast.actionText}</Button>
                </form>
            </Form>
            <Separator />

            <AlertModal isOpen={open} onClose={()=>setOpen(false)} onConfirm={onDelete} loading={loading} title="Delete this Variant?'" description="Products in this variant will also be deleted!" />
        </>
    )
}

export default VariantForm