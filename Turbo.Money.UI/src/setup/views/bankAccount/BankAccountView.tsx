import React from "react";

import CommonView from '../CommonView';

import BankAccountDetailsView from './BankAccountDetailsView';
import BankAccountEditView from './BankAccountEditView';

const modeViews = {
    details: BankAccountDetailsView,
    add: BankAccountEditView,
    edit: BankAccountEditView,
    delete: BankAccountDetailsView,
    none: BankAccountDetailsView
}

const BankAccountView = ({ viewModel }) => {
    return (
        <CommonView viewModel={viewModel} modeViews={modeViews} />
    );
};

export default BankAccountView;