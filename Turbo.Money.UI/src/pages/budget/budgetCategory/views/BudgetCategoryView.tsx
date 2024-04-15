
import CommonView from 'pages/common/views/CommonView';
import ICommonModeViews from 'pages/common/views/ICommonModeViews';
import IViewFactoryProps from 'pages/common/views/IViewFactoryProps';

import BudgetCategoryDetailsView from './BudgetCategoryDetailsView';
import BudgetCategoryEditView from './BudgetCategoryEditView';

const modeViews: ICommonModeViews = {
    details: BudgetCategoryDetailsView,
    add: BudgetCategoryEditView,
    edit: BudgetCategoryEditView,
    delete: BudgetCategoryDetailsView,
    none: BudgetCategoryDetailsView
}

export default function BudgetCategoryView({ dataContext }: IViewFactoryProps) {
    return (
        <CommonView dataContext={dataContext} modeViews={modeViews} />
    );
}
