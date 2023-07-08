import Heading from '@/Components/Heading'
import { Button } from '@/Components/ui/button'
import { Separator } from '@/Components/ui/separator'
import { IBillboard, IImage, IStore, PageProps } from '@/types'
import { Trash } from 'lucide-react'
import React, { ChangeEventHandler, FC, useCallback, useMemo, useState } from 'react'


import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/Components/ui/form'
import { Input } from '@/Components/ui/input'
import { router, usePage } from '@inertiajs/react'
import { toast } from 'react-toastify';
import AlertModal from '@/Components/Modals/AlertModal'
import ImageUpload from '../ImageUpload'


const formSchema = zod.object({
    label:zod.string().min(1),
    image:zod.number()
});

type BillboardFormValues = zod.infer<typeof formSchema>

interface BillboardFormProps{
    billboard?:IBillboard;
    images:IImage[]
}

const BillboardForm:FC<BillboardFormProps> = ({billboard,images}) => {
    const {current_store} = usePage<PageProps>().props;
    const [open,setOpen]=useState(false);
    const [loading,setLoading]=useState(false);
    const form = useForm<BillboardFormValues>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            label:billboard?.label||"",
            image:billboard?.image.id||0
        }
    });


    const headingTextandToast=useMemo(()=>{
        return{
            title:billboard?'Edit this Billboard':'Add New Bilboard',
            description:billboard?'Make Changes to this Billboard...':'Create a new Billboard...',
            toast:billboard?'Billboard Updated':'Billboard Created',
            actionText:billboard?'Save Changes':'Create Billboard',
            url:billboard?route('admin.billboards.update',{store_id:current_store.id}):route('admin.billboards.store',{store_id:current_store.id})
        }
    }
    ,[billboard]);

    const onSubmit = useCallback(({label,image}:BillboardFormValues) =>{
        if(form.getValues('image')===0) return toast.error('Selet a background Image!');
        router.post(headingTextandToast.url,{
            id:billboard?.id,
            store_id:current_store.id,
            label,
            image,
        },{
            onStart:()=>setLoading(true),
            onSuccess:()=>toast.success(headingTextandToast.toast),
            onError:(e:any)=>{
                toast.error(e.image??'Something Went Wrong');
            },
            onFinish:()=>setLoading(false),
            preserveState:false,
        });
    },[billboard?.id,current_store.id]);

    const onDelete = () =>{
    
    }

    const handleUpload= (image:File) =>{
        if(!image)return null;
        router.post(route('admin.images.store'),{image},{
            onStart:()=>setLoading(true),
            onSuccess:()=>toast.info('Image Uploaded...'),
            onError:(e:any)=>{
                toast.error(e.image??'Something Went Wrong');
            },
            onFinish:()=>setLoading(false),
            preserveState:false,
        });
    }

    const handleDelete = (id:number) =>{
        router.post(route('admin.images.delete'),{id},{
            onStart:()=>setLoading(true),
            onSuccess:()=>toast.info('Image Deleted...'),
            onError:(e:any)=>{
                toast.error('Something Went Wrong...');
                console.log(e);
            },
            onFinish:()=>setLoading(false),
            preserveState:false,
        });
    }

    



    return (
        <>
            <div className='flex items-center justify-between'>
                <Heading title={headingTextandToast.title} description={headingTextandToast.description} />
                {
                    billboard&&(
                        <Button variant='destructive' size='sm' disabled={loading} onClick={()=>setOpen(true)}>
                            <Trash className='h-3.5 w-3.5' />
                        </Button>
                    )
                }
                
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col space-y-7 w-full'>
                    <FormField control={form.control} name='image' render={({field})=>(
                        <FormItem>
                            <FormLabel>Select a Background Image:</FormLabel>
                            <FormControl>
                                <ImageUpload handleUpload={handleUpload} disabled={loading} images={images} image={field.value} onChange={(imageId)=>field.onChange(field.value===imageId?0:imageId)} onRemove={(id:number)=>{
                                    field.onChange(0);
                                    handleDelete(id);
                                    }}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <div className='grid grid-cols-3 gap-7'>
                        <FormField control={form.control} name='label' render={({field})=>(
                            <FormItem>
                                <FormLabel>Label:</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder='Billboard Label...' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                    <Button disabled={loading} className='ml-auto'>{headingTextandToast.actionText}</Button>
                </form>
            </Form>
            <Separator />
            <AlertModal isOpen={open} onClose={()=>setOpen(false)} onConfirm={onDelete} loading={loading} />
        </>
    )
}

export default BillboardForm