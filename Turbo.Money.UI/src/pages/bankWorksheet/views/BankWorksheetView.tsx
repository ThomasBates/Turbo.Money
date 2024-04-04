import React, { useContext, useState } from 'react';

import AppContext from 'app/AppContext';

import BankBankEditView, { BankBankEditData } from './BankBankEditview';

const BankWorksheetView: React.FC = () => {
    const module = BankWorksheetView.name;
    const category = 'BankWorksheet';

    const { logger } = useContext(AppContext);

    const [isBankBankEditViewOpen, setBankBankEditViewOpen] = useState<boolean>(false);
    const [bankBankEditData, setBankBankEditData] = useState<BankBankEditData | null>(null);

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

    const handleFormSubmit = (data: BankBankEditData): void => {
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