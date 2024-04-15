import React, { useState } from 'react';

import { useAppContext } from 'app/AppContextAccess';

import BankBankEditView, { IBankBankEditData } from './bankBankEditView';

const BankWorksheetView: React.FC = () => {
    const module = BankWorksheetView.name;
    const category = 'BankWorksheet';

    const { logger } = useAppContext();

    const [isBankBankEditViewOpen, setBankBankEditViewOpen] = useState<boolean>(false);
    const [bankBankEditData, setBankBankEditData] = useState<IBankBankEditData | null>(null);

    const handleOpenBankBankEditView = () => {
        const context = `${module}.${handleOpenBankBankEditView.name}`;
        logger.debug(category, context, 'setBankBankEditViewOpen(true)');
        setBankBankEditViewOpen(true);
    }

    const handleCloseBankBankEditView = () => {
        const context = `${module}.${handleCloseBankBankEditView.name}`;
        logger.debug(category, context, 'setBankBankEditViewOpen(false)');
        setBankBankEditViewOpen(false);
    }

    const handleFormSubmit = (data: IBankBankEditData): void => {
        const context = `${module}.${handleFormSubmit.name}`;
        logger.debug(category, context, 'data =', data);
        setBankBankEditData(data);
        handleCloseBankBankEditView();
    }

    return (
        <>
            <div style={{ display: "flex", gap: "1em" }}>
                <button onClick={handleOpenBankBankEditView}>Edit Bank</button>
            </div>

            {bankBankEditData && (
                <div className="msg-box msg-box--success">
                    Bank <b>{bankBankEditData.name}</b>
                    Number <b>{bankBankEditData.number}</b>
                    Branch <b>{bankBankEditData.branch}</b>
                </div>
            )}

            <BankBankEditView
                isOpen={isBankBankEditViewOpen}
                onSubmit={handleFormSubmit}
                onClose={handleCloseBankBankEditView} />
        </>
    );
}

export default BankWorksheetView;