import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar'
import { Button } from '@/Components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu'
import { PageProps } from '@/types'
import { usePage } from '@inertiajs/react'
import {FC} from 'react'

const UserNav:FC = () => {
    const {user} = usePage<PageProps>().props.auth;
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-9 w-9">
                    <AvatarImage src="https://i.pravatar.cc/300?img=2" alt="@shadcn" />
                    <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            Profile
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserNav