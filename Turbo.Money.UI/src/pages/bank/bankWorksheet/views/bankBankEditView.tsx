import React, { useEffect, useRef, useState } from 'react';

import { useAppContext } from 'app/AppContextAccess';

//import './bankWorksheet.css';

import Modal from 'components/modal.ts/Modal';

export interface IBankBankEditData {
    name: string;
    number: string;
    branch: string;
}

const initialBankBankEditData: IBankBankEditData = {
    name: '',
    number: '',
    branch: '',
};

interface IBankBankEditProps {
    isOpen: boolean;
    onSubmit: (data: IBankBankEditData) => void;
    onClose: () => void;
}

const BankBankEditView: React.FC<IBankBankEditProps> = ({ isOpen, onSubmit, onClose }) => {
    const module = BankBankEditView.name;
    const category = 'BankWorksheet';

    const { logger } = useAppContext();

    const focusInputRef = useRef<HTMLInputElement | null>(null);
    const [formState, setFormState] = useState<IBankBankEditData>(initialBankBankEditData);

    useEffect(() => {
        if (isOpen && focusInputRef.current) {
            setTimeout(() => {
                focusInputRef.current!.focus();
            }, 0);
        }
    }, [isOpen])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const context = `${module}.${handleInputChange.name}`;
        const { name, value } = event.target;
        logger.debug(category, context, `${name} = ${value}`);
        setFormState((preFormData) => ({
            ...preFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (event: React.FormEvent): void => {
        const context = `${module}.${handleInputChange.name}`;
        logger.debug(category, context, `formState =`, formState);
        event.preventDefault();
        onSubmit(formState);
        setFormState(initialBankBankEditData);
    }

    return (
        <Modal
            hasCloseBtn={true}
            isOpen={isOpen}
            onClose={onClose}
        >
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <label htmlFor="name">Bank Name</label>
                    <input
                        ref={focusInputRef}
                        type="name"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-row">
                    <label htmlFor="name">Bank Number</label>
                    <input
                        ref={focusInputRef}
                        type="number"
                        id="number"
                        name="number"
                        value={formState.number}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-row">
                    <label htmlFor="name">Bank Branch</label>
                    <input
                        ref={focusInputRef}
                        type="branch"
                        id="branch"
                        name="branch"
                        value={formState.branch}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-row">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </Modal>
    );
}

export default BankBankEditView;