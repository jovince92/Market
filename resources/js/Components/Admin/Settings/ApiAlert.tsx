import { Alert, AlertDescription, AlertTitle } from '@/Components/ui/alert';
import { Badge, BadgeProps } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Copy, Server } from 'lucide-react';
import React, { FC } from 'react'
import { toast } from 'react-toastify';

interface ApiAlertProps{
    title:string;
    description:string;
    variant:'public'|'admin';
}

const TextMap:Record<ApiAlertProps['variant'],string>={
    public:'Public',
    admin:'Admin'
}
const VariantMap:Record<ApiAlertProps['variant'],BadgeProps['variant']>={
    public:'secondary',
    admin:'destructive'
}


const ApiAlert:FC<ApiAlertProps> = ({title,description,variant}) => {
    const onCopy = ()=>{
        navigator.clipboard.writeText(description); 
        toast.info('Copied to Clipboard!');
    }
    return (
        <Alert className=''  >
            <Server className='h-6 w-6' />
            <AlertTitle className='flex items-center gap-x-1.5'>
                <p className='pr-6'>{title}</p>
                <Badge variant={VariantMap[variant]} >{TextMap[variant]}</Badge>
            </AlertTitle>
            <AlertDescription   className='mt-3.5 flex items-center justify-between'>
                <code className='relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'>{description}</code>
                <Button variant='outline' size='icon' onClick={onCopy}>
                    <Copy className='h-3.5 w-3.5'  />   
                </Button>
            </AlertDescription>
        </Alert>
    )
}

export default ApiAlert 