import React from "react";

import CommonView from '../../common/views/CommonView';

import BankDetailsView from './BankBankDetailsView';
import BankEditView from './BankBankEditView';

const modeViews = {
    details: BankDetailsView,
    add: BankEditView,
    edit: BankEditView,
    delete: BankDetailsView,
    none: BankDetailsView
}

const BankView = ({ viewModel }) => {
    return (
        <CommonView viewModel={viewModel} modeViews={modeViews} />
    );
};

export default BankView;