import AdminLayout from '@/Components/Layouts/Admin/AdminLayout'
import useStoreModal from '@/Hooks/useStoreModal'
import { IStore } from '@/types'
import { Head } from '@inertiajs/react';
import {FC, useEffect} from 'react'

interface DashboardProps{
    store:IStore;
}

const Dashboard:FC<DashboardProps> = ({store}) => {
    
    const {onClose,isOpen} = useStoreModal();
    useEffect(()=>{
        if(isOpen) onClose();
    },[store]);
    return (
        <AdminLayout>
            <Head title='Dashboard' />
            <div>Dashboard</div>
        </AdminLayout>
    )
}

export default Dashboard