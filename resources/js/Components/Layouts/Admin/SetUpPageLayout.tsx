import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import React, { FC, ReactNode } from 'react'


interface SetUpPageLayoutProps{
    children:ReactNode
}

const SetUpPageLayout:FC<SetUpPageLayoutProps>= ({children}) => {
    
    const {user} = usePage<PageProps>().props.auth;
    return (
        <div>SetUpPageLayout</div>
    )
}

export default SetUpPageLayout