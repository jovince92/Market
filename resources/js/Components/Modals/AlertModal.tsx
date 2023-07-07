import React, { FC } from 'react'
import Modal from './Modal';
import { Button } from '../ui/button';

interface AlertModalProps{
    isOpen:boolean;
    onClose:()=>void;
    onConfirm:()=>void;
    loading?:boolean;
}

const AlertModal:FC<AlertModalProps> = ({isOpen,onClose,onConfirm,loading}) => {
    return (
        <Modal title='Are you sure?' description='This is irreversible...' isOpen={isOpen} onClose={onClose}>
            <div className='pt-5 space-x-1.5 flex items-center justify-end w-full'>
                <Button variant='outline' onClick={onClose} disabled={loading}>Cancel</Button>
                <Button disabled={loading} variant='destructive' onClick={onConfirm}>Continue...</Button>
            </div>
        </Modal>
    )
}

export default AlertModal