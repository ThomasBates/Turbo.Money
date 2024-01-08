import React from "react";

import CommonView from '../../common/views/CommonView';

import BudgetAccountDetailsView from './BudgetAccountDetailsView';
import BudgetAccountEditView from './BudgetAccountEditView';

const modeViews = {
    details: BudgetAccountDetailsView,
    add: BudgetAccountEditView,
    edit: BudgetAccountEditView,
    delete: BudgetAccountDetailsView,
    none: BudgetAccountDetailsView
}

const BudgetAccountView = ({ viewModel }) => {
    return (
        <CommonView viewModel={viewModel} modeViews={modeViews} />
    );
};

export default BudgetAccountView;