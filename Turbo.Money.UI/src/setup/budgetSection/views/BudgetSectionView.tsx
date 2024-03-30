import React from "react";

import CommonView from '../../common/views/CommonView';

import BudgetSectionDetailsView from './BudgetSectionDetailsView';
import BudgetSectionEditView from './BudgetSectionEditView';


const modeViews = {
    details: BudgetSectionDetailsView,
    add: BudgetSectionEditView,
    edit: BudgetSectionEditView,
    delete: BudgetSectionDetailsView,
    none: BudgetSectionDetailsView
}

export default function BudgetSectionView({ viewModel }) {
    return (
        <CommonView viewModel={viewModel} modeViews={modeViews} />
    );
};
