import { IProduct, PageProps } from '@/types'
import React, { FC, useCallback, useMemo, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { router, usePage } from '@inertiajs/react';
import { IImage } from '../../../types/index';
import Heading from '@/Components/Heading';
import { Button } from '@/Components/ui/button';
import { Trash } from 'lucide-react';
import { Separator } from '@/Components/ui/separator';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/Components/ui/form';
import ImageUpload from '../ImageUpload';
import { Input } from '@/Components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import AlertModal from '@/Components/Modals/AlertModal';
import { Label } from '@/Components/ui/label';
import { toast } from 'react-toastify';
import axios from 'axios';



const formSchema = zod.object({
    category_id:zod.number().int().gt(0,"Select a Category!"),
    name:zod.string().min(1),
    price:zod.string().min(1)
});

type ProductFormValues = zod.infer<typeof formSchema>



interface ProductFormProps{
    product?:IProduct;
}

const ProductForm:FC<ProductFormProps> = ({product}) => {
    const {current_store} = usePage<PageProps>().props;
    const [open,setOpen]=useState(false);
    const [loading,setLoading]=useState(false);
    const [imagesPreviews,setImagesPreviews]=useState<IImage[]>(product?.images||[]);
    const [imagesToUpload,setImagesToUpload]=useState<File[]>([]);
    const form = useForm<ProductFormValues>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            name:product?.name||"",
            category_id:product?.category_id||0,
            price:product?.price.toString()||'0.00',
        }
    });
    

    const headingTextandToast=useMemo(()=>{
        return{
            title:product?'Edit this Product':'Add New Product',
            description:product?'Make Changes to this Product...':'Create a new Product...',
            toast:product?'Product Updated':'Product Created',
            actionText:product?'Save Changes':'Create Product',
            url:product?route('admin.products.update',{store_id:current_store.id}):route('admin.products.store',{store_id:current_store.id})
        }
    }
    ,[product]);

    const onSubmit = useCallback(() =>{
        if(imagesToUpload.length<1&&imagesPreviews.length<1)return toast.error('Select Image/s...');
        router.post(headingTextandToast.url,{
            id:product?.id,
            store_id:current_store.id,
            name:form.getValues('name'),
            price:form.getValues('price'),
            category_id:form.getValues('category_id'),
            images:imagesToUpload 
        },{
            onStart:()=>setLoading(true),
            onSuccess:()=>toast.success(headingTextandToast.toast),
            onError:(e:any)=>{
                console.log(e);
                if(e.images) toast.error('Images are empty')
                toast.error(e.price?e.price:'Something Went Wrong');
            },
            onFinish:()=>setLoading(false),
            //preserveState:false,
        });
    },[imagesToUpload,current_store.id,product?.id]);

    const handleImageSelect = (e:File) =>{
        
        const url = URL.createObjectURL(e) ;
        const img={
            id:parseFloat("0."+(imagesPreviews.length+1).toString()),
            name:e.name,
            location:url,
            created_at:null,
            updated_at:null
        };
        
        setImagesPreviews(val=>([...val,img]));
        setImagesToUpload(val=>([...val,e]));
    }

    const handleImageDelete = (id:number) =>{
        const file = imagesPreviews.find(image=>image.id===id);
        setImagesPreviews(val=>val.filter(image=>id!==image.id));
        setImagesToUpload(val=>val.filter(image=>file?.name!==image.name));
        if(file?.created_at&&file.updated_at){
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
    }

    const onProductDelete = async() =>{
        if(!product)return ;
        try {
            setLoading(true);
            await axios.post(route('admin.products.delete',{store_id:current_store.id}),{id:product.id});
            toast.info('Product Deleted!');
            router.get(route('admin.products.index',{store_id:current_store.id}))
        } catch (e:any) {
            toast.error('Something Went Wrong...');
            console.log(e);
        } finally{
            setLoading(false)
        }
    }

    return (
        <>
            <div className='flex items-center justify-between'>
                <Heading title={headingTextandToast.title} description={headingTextandToast.description} />
                {
                    product&&(
                        <Button variant='destructive' size='sm' disabled={loading} onClick={()=>setOpen(true)}>
                            <Trash className='h-3.5 w-3.5' />
                        </Button>
                    )
                }
                
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col space-y-7 w-full'>
                    <Label>Select Product Image/s (can upload multiple files...):</Label>
                    <div className='inline'>
                        <ImageUpload text='Select an Image...' handleUpload={handleImageSelect} disabled={loading} images={imagesPreviews} image={0} onChange={()=>null} onRemove={(id:number)=>handleImageDelete(id)}/>
                    </div>
                    
                    
                    <div className='grid grid-cols-3 gap-7'>
                        <FormField control={form.control} name='name' render={({field})=>(
                            <FormItem>
                                <FormLabel>Product Name:</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder='Product Name...' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField control={form.control} name='price' render={({field})=>(
                            <FormItem>
                                <FormLabel>Product Price:</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} type='number' step=".01" placeholder='Product Price... ex.(25.50)'  {...field}   />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField control={form.control} name='category_id' render={({field})=>(
                            <FormItem>
                                <FormLabel>Category:</FormLabel>
                                <Select disabled={loading} onValueChange={(e)=>field.onChange(parseInt(e))} value={field.value.toString()} defaultValue={field.value.toString()}  >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue  defaultValue={field.value} placeholder='Select a Category...' />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {
                                            (current_store.categories||[]).map(({id,name})=> <SelectItem key={id} value={id.toString()} >{name}</SelectItem> )
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
            <AlertModal isOpen={open} onClose={()=>setOpen(false)} onConfirm={onProductDelete} loading={loading} title="Archive this Product?'" description="Make Sure there are no orders with this product..." />
        </>
    )
}

export default ProductForm