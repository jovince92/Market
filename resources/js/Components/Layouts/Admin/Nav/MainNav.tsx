import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import React, { FC, HTMLAttributes } from 'react'



const MainNav:FC<HTMLAttributes<HTMLElement>>= ({className,...props}) => {
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

export const navRoutes=[
    {
        //@ts-ignore
        href:route('admin.dashboard.settings',{id:route().params['id'] as string}),
        label:'Settings',
        active: route().current('admin.dashboard.settings')
    }
] as {
    href:string,
    label:string;
    active?:boolean;
}[];