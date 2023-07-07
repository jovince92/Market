import Heading from '@/Components/Heading'
import { Button } from '@/Components/ui/button'
import { Separator } from '@/Components/ui/separator'
import { IStore } from '@/types'
import { Trash } from 'lucide-react'
import React, { FC, useState } from 'react'


import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/Components/ui/form'
import { Input } from '@/Components/ui/input'
import { router } from '@inertiajs/react'
import { toast } from 'react-toastify';
import AlertModal from '@/Components/Modals/AlertModal'


const formSchema = zod.object({
    name:zod.string().min(1),
});

type SettingsFormValues = zod.infer<typeof formSchema>

interface SettingsFormProps{
    store:IStore
}

const SettingsForm:FC<SettingsFormProps> = ({store}) => {
    const {id}=store;
    const [open,setOpen]=useState(false);
    const [loading,setLoading]=useState(false);
    const form = useForm<SettingsFormValues>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            name:store.name
        }
    });

    const onSubmit = ({name}:SettingsFormValues) =>{
        router.post(route('admin.stores.update'),
            {
                id,
                name
            },{
                onStart:()=>setLoading(true),
                onSuccess:()=>toast.success('Store Updated...'),
                onError:()=>toast.error('Internal Error. Something went wrong.'),
                onFinish:()=>setLoading(false)
            })
    }

    const onDelete = () =>{
        router.post(route('admin.stores.delete'),{id},{
            onStart:()=>setLoading(true),
            onSuccess:()=>{
                toast.info('Store deleted...');
                setOpen(false);
            },
            onError:()=>toast.error('Internal Error. Something went Wrong'),
            onFinish:()=>setLoading(false)
        })
    }


    return (
        <>
            <div className='flex items-center justify-between'>
                <Heading title='Settings' description='Manage Store Preferences...' />
                <Button variant='destructive' size='sm' disabled={loading} onClick={()=>setOpen(true)}>
                    <Trash className='h-3.5 w-3.5' />
                </Button>
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col space-y-7 w-full'>
                    <div className='grid grid-cols-3 gap-7'>
                        <FormField control={form.control} name='name' render={({field})=>(
                            <FormItem>
                                <FormLabel>Name:</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder='Store Name...' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                    <Button disabled={loading} className='ml-auto'>Save Changes</Button>
                </form>
            </Form>
            <AlertModal isOpen={open} onClose={()=>setOpen(false)} onConfirm={onDelete} loading={loading} />
        </>
    )
}

export default SettingsForm