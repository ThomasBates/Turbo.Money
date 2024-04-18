
import IFactoryViewProps from 'common/views/IFactoryViewProps';

import BasicMainView from 'pages/basic/common/views/BasicMainView';
import IBasicModeViews from 'pages/basic/common/views/IBasicModeViews';

import BudgetCategoryDetailsView from './BudgetCategoryDetailsView';
import BudgetCategoryEditView from './BudgetCategoryEditView';

const modeViews: IBasicModeViews = {
    details: BudgetCategoryDetailsView,
    add: BudgetCategoryEditView,
    edit: BudgetCategoryEditView,
    delete: BudgetCategoryDetailsView,
    none: BudgetCategoryDetailsView
}

export default function BudgetCategoryMainView({ dataContext }: IFactoryViewProps) {
    return (
        <BasicMainView dataContext={dataContext} modeViews={modeViews} />
    );
}
