import React, { FC } from 'react'
import UserNav from './UserNav'
import MainNav from './MainNav'
import StoreSwitcher from './StoreSwitcher'

const NavBar:FC = () => {
    return (
        <div className='border-b'>
            <div className='flex h-16 items-center px-3.5'>
                <StoreSwitcher />
                <MainNav className='mx-5' />
                <div className='ml-auto flex items-center space-x-3.5'>
                    <UserNav />
                </div>
            </div>
        </div>
    )
}

export default NavBar