import React, { useContext, useEffect, useRef, useState } from "react";

import AppContext from 'app/AppContext';

//import style from "./Modal.module.css";
import "./Modal.module.css";

//  https://blog.logrocket.com/creating-reusable-pop-up-modal-react/

interface ModalProps {
    isOpen: boolean;
    hasCloseBtn?: boolean;
    onClose?: () => void;
    children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, hasCloseBtn, onClose, children }) => {
    const module = Modal.name;
    const category = 'Modal';

    const { logger } = useContext(AppContext);

    const [isModalOpen, setModalOpen] = useState(isOpen);
    const modalRef = useRef<HTMLDialogElement | null>(null);

    useEffect(() => {
        const context = `${module}.${useEffect.name}[isOpen]`;
        logger.debug(category, context, `setModalOpen(${isOpen})`);
        setModalOpen(isOpen);
    }, [isOpen]);

    useEffect(() => {
        const context = `${module}.${useEffect.name}[isModalOpen]`;
        const modalElement = modalRef.current;
        if (modalElement) {
            if (isModalOpen) {
                logger.debug(category, context, 'modalElement.showModal()');
                modalElement.showModal();
            } else {
                logger.debug(category, context, 'modalElement.close()');
                modalElement.close();
            }
        }
    }, [isModalOpen]);

    const handleCloseModal = () => {
        const context = `${module}.${handleCloseModal.name}`;
        if (onClose)
            onClose();
        logger.debug(category, context, 'setModalOpen(false)');
        setModalOpen(false);
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
        const context = `${module}.${handleKeyDown.name}`;
        if (event.key === 'Escape') {
            logger.debug(category, context, 'handleCloseModal()');
            handleCloseModal();
        }
    }

    return (
        <dialog
            ref={modalRef}
            //className={style.modal}
            className='modal'
            onKeyDown={handleKeyDown}
        >
            {hasCloseBtn && (
                <button className='modal_close_btn' onClick={handleCloseModal}>
                    Close
                </button>
            )}
            {children}
        </dialog>
    );
}

export default Modal;