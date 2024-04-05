
import CommonView from '../../common/views/CommonView';

import BudgetCategoryDetailsView from './BudgetCategoryDetailsView';
import BudgetCategoryEditView from './BudgetCategoryEditView';

const modeViews = {
    details: BudgetCategoryDetailsView,
    add: BudgetCategoryEditView,
    edit: BudgetCategoryEditView,
    delete: BudgetCategoryDetailsView,
    none: BudgetCategoryDetailsView
}

export default function BudgetCategoryView({ viewModel }) {
    return (
        <CommonView viewModel={viewModel} modeViews={modeViews} />
    );
};
