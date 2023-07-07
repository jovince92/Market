import SettingsForm from '@/Components/Admin/Settings/SettingsForm'
import AdminLayout from '@/Components/Layouts/Admin/AdminLayout'
import { IStore, PageProps } from '@/types'
import { Head, usePage } from '@inertiajs/react'
import React, { FC } from 'react'



const Settings:FC = () => {
    
    const {current_store} = usePage<PageProps>().props
    return (
        <AdminLayout>
            <Head title='Settings' />
            <div className='flex flex-col'>
                <div className='flex-1 space-y-3.5 p-7 pt-5'>
                    <SettingsForm store={current_store} />
                </div>
            </div>
        </AdminLayout>
    )
}

export default Settings