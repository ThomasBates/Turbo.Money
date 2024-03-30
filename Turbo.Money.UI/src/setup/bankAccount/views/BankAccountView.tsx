import React from "react";

import CommonView from '../../common/views/CommonView';

import BankAccountDetailsView from './BankAccountDetailsView';
import BankAccountEditView from './BankAccountEditView';

const modeViews = {
    details: BankAccountDetailsView,
    add: BankAccountEditView,
    edit: BankAccountEditView,
    delete: BankAccountDetailsView,
    none: BankAccountDetailsView
}

export default function BankAccountView({ viewModel }) {
    return (
        <CommonView viewModel={viewModel} modeViews={modeViews} />
    );
};
