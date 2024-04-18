
import IFactoryViewProps from 'common/views/IFactoryViewProps';

import BasicMainView from 'pages/basic/common/views/BasicMainView';
import IBasicModeViews from 'pages/basic/common/views/IBasicModeViews';

import BudgetSectionDetailsView from './BudgetSectionDetailsView';
import BudgetSectionEditView from './BudgetSectionEditView';

const modeViews: IBasicModeViews = {
    details: BudgetSectionDetailsView,
    add: BudgetSectionEditView,
    edit: BudgetSectionEditView,
    delete: BudgetSectionDetailsView,
    none: BudgetSectionDetailsView
}

export default function BudgetSectionMainView({ dataContext }: IFactoryViewProps) {
    return (
        <BasicMainView dataContext={dataContext} modeViews={modeViews} />
    );
}
