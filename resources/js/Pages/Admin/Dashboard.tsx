import AdminLayout from '@/Components/Layouts/Admin/AdminLayout'
import useStoreModal from '@/Hooks/useStoreModal'
import { IStore, PageProps } from '@/types'
import { Head, usePage } from '@inertiajs/react';
import {FC, useEffect} from 'react'



const Dashboard:FC = () => {
    const {current_store} = usePage<PageProps>().props;
    
    const {onClose,isOpen} = useStoreModal();
    useEffect(()=>{
        if(isOpen) onClose();
    },[current_store]);
    return (
        <AdminLayout>
            <Head title='Dashboard' />
            <div>Dashboard</div>
        </AdminLayout>
    )
}

export default Dashboard