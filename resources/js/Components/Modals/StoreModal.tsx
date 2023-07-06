import React, { FC } from 'react'
import Modal from './Modal'
import useStoreModal from '@/Hooks/useStoreModal'

const StoreModal:FC = () => {
    const {isOpen,onClose} = useStoreModal();
    return (
        <Modal title='New Store' description='Create a new store' isOpen={isOpen} onClose={onClose}>
            TODO:Create Store Form
        </Modal>
    )
}

export default StoreModal