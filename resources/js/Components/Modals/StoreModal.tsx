import React, { FC, useState } from 'react'
import Modal from './Modal'
import useStoreModal from '@/Hooks/useStoreModal'
import * as zod from 'zod'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { toast } from 'react-toastify';
import { router } from '@inertiajs/react';

const formSchema = zod.object({
    name:zod.string().min(1),
});

const StoreModal:FC = () => {
    const {isOpen,onClose} = useStoreModal();
    const [loading,setLoading] = useState(false);
    const form = useForm<zod.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            name:""
        }
    });

    const onSubmit = (values: zod.infer<typeof formSchema>) =>{
        const {name} = values;
        
        setLoading(true);
        
        router.post(route('admin.stores.store'),{name},{
            onStart:()=>setLoading(true),
            onSuccess:()=>toast.info('Store created...'),
            onError:()=>toast.error('Internal Error. Something Went Wrong...'),
            onFinish:()=>setLoading(false)
        });
    }

    return (
        <Modal title='New Store' description='Create a new store' isOpen={isOpen} onClose={onClose}>
            <div>
                <div className='flex flex-col space-y-3.5 py-1.5 pb-3.5'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField control={form.control} name='name' render={({field})=>(
                                <FormItem>
                                    <FormLabel>Name:</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder='ex. : Smart Phones' autoComplete='off' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <div className='p-5 flex items-center space-x-1.5 justify-end w-full'>
                                <Button disabled={loading} type='button' variant={'outline'} onClick={onClose}>Cancel</Button>
                                <Button disabled={loading} type='submit'>Continue</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    )
}

export default StoreModal