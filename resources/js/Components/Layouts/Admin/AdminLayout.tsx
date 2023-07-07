import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import React, { FC, ReactNode } from 'react'
import NavBar from './Nav/NavBar';

interface AdminLayoutProps{
    children:ReactNode
}

const AdminLayout:FC<AdminLayoutProps>= ({children}) => {
    const {user} = usePage<PageProps>().props.auth;
    return (
        <>
            <NavBar />
            {children}
        </>
    )
}

export default AdminLayout