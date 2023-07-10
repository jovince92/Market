import { cn } from '@/lib/utils';
import { PageProps } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import React, { FC, HTMLAttributes } from 'react'

type MainNavRouteItems = {
    href:string;
    label:string;
    active?:boolean;
}

const MainNav:FC<HTMLAttributes<HTMLElement>>= ({className,...props}) => {
    
    const {current_store} = usePage<PageProps>().props
    const navRoutes:MainNavRouteItems[]=[
        {
            href:route('admin.dashboard.index',{id:current_store.id}),
            label:'Home',
            active: route().current('admin.dashboard.index',{id:current_store.id})
        },
        {
            href:route('admin.dashboard.settings',{id:current_store.id}),
            label:'Settings',
            active: route().current('admin.dashboard.settings',{id:current_store.id})
        },
        {
            href:route('admin.billboards.index',{id:current_store.id}),
            label:'Billboards',
            active: route().current()?.includes('billboards')
        },
        {
            href:route('admin.categories.index',{id:current_store.id}),
            label:'Categories',
            active: route().current()?.includes('categories')
        },
        {
            href:route('admin.variants.index',{id:current_store.id}),
            label:'Variants',
            active: route().current()?.includes('variants')
        },
    ] ;
    return (
        <nav className={cn('flex items-center space-x-3.5 lg:space-x-5',className)}>
            {
                navRoutes.map(({label,active ,href})=> (
                    <div className={cn('text-sm font-medium transition-colors hover:text-primary',
                        active?'text-black dark:text-white':'text-muted-foreground')} key={label}>
                        <Link href={href}>{label}</Link>
                        
                    </div> 
                ))
            }
        </nav>
    )
}

export default MainNav

