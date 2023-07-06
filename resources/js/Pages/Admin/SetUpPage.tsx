import Modal from '@/Components/Modals/Modal';
import useStoreModal from '@/Hooks/useStoreModal';
import { FC, useEffect } from 'react';

const SetUpPage:FC = () => {
    const {onOpen,isOpen} = useStoreModal(({onOpen,isOpen})=>({onOpen,isOpen}));
    useEffect(()=>{
        if(!isOpen) onOpen();
    },[isOpen,onOpen]);
    return (
        <div>
            SetUpPage
        </div>
    )
}

export default SetUpPage