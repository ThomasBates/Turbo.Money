import React from "react";

import CommonView from '../CommonView';

import BankDetailsView from './BankDetailsView';
import BankEditView from './BankEditView';

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