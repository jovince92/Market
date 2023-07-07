
import { Button } from '@/Components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/Components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/ui/popover'
import useStoreModal from '@/Hooks/useStoreModal'
import { cn } from '@/lib/utils'
import { IStore, PageProps } from '@/types'
import { router, usePage } from '@inertiajs/react'
import { CommandSeparator } from 'cmdk'
import { Check, ChevronsUpDown, PlusCircle, Store } from 'lucide-react'
import React, { ComponentPropsWithRef, FC, useState } from 'react'

interface PopoverTriggerProps extends ComponentPropsWithRef<typeof PopoverTrigger>{}



const StoreSwitcher:FC<PopoverTriggerProps> = ({className,...props}) => {
    const {current_store} = usePage<PageProps>().props
    const {isOpen,onClose,onOpen} = useStoreModal();
    const [open,setOpen] = useState<boolean>(false);
    const {my_stores} = usePage<PageProps>().props.auth;
    
    const currentStore:IStore|undefined =current_store;
    const onStoreSelect = (id:number) =>{
        setOpen(false);
        router.get(route('admin.dashboard.index',{id}))
    }
    return (
        <Popover>
            <PopoverTrigger asChild >
                <Button variant={'outline'} size='sm' role='combobox' aria-expanded={open} aria-label='Select a Store' className={cn('w-48 flex justify-between',className)}>
                    <Store className='mr-1.5 h-3.5 w-3.5' />
                    {currentStore?.name}
                    <ChevronsUpDown className='ml-auto h-3.5 w-3.5  shrink-0 opacity-50' />
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-48 p-0'>
                <Command>
                    <CommandList>
                        <CommandInput placeholder='Search Stores...' />
                        <CommandEmpty>No Store Found...</CommandEmpty>
                        <CommandGroup heading='Stores...'>
                            {
                                my_stores.map(({id,name})=>(
                                    <CommandItem key={id} onSelect={()=>onStoreSelect(id) } className='text-sm flex cursor-pointer'>
                                        <Store className='mr-1.5 h-3.5 w-3.5' />
                                        {name}
                                        <Check className={cn(' ml-auto h-3.5 w-3.5',currentStore?.id===id?'opacity-100':'opacity-0')} />
                                    </CommandItem>
                                ))
                            }
                        </CommandGroup>
                    </CommandList>
                    <CommandSeparator />
                    <CommandList>
                        <CommandGroup>
                            <CommandItem onSelect={()=>{
                                setOpen(false);
                                onOpen();
                                }}>
                                <PlusCircle className='mr-1.5 h-4 w-4' />
                                Create new store...
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default StoreSwitcher