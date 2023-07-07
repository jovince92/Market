import SettingsForm from '@/Components/Admin/Settings/SettingsForm'
import AdminLayout from '@/Components/Layouts/Admin/AdminLayout'
import { IStore } from '@/types'
import { Head } from '@inertiajs/react'
import React, { FC } from 'react'

interface SettingsProps{
    store:IStore
}

const Settings:FC<SettingsProps> = ({store}) => {
    return (
        <AdminLayout>
            <Head title='Settings' />
            <div className='flex flex-col'>
                <div className='flex-1 space-y-3.5 p-7 pt-5'>
                    <SettingsForm store={store} />
                </div>
            </div>
        </AdminLayout>
    )
}

export default Settings