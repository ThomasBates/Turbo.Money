
import CommonView from 'pages/common/views/CommonView';
import ICommonModeViews from 'pages/common/views/ICommonModeViews';
import IViewFactoryProps from 'pages/common/views/IViewFactoryProps';

import BudgetSectionDetailsView from './BudgetSectionDetailsView';
import BudgetSectionEditView from './BudgetSectionEditView';

const modeViews: ICommonModeViews = {
    details: BudgetSectionDetailsView,
    add: BudgetSectionEditView,
    edit: BudgetSectionEditView,
    delete: BudgetSectionDetailsView,
    none: BudgetSectionDetailsView
}

export default function BudgetSectionView({ dataContext }: IViewFactoryProps) {
    return (
        <CommonView dataContext={dataContext} modeViews={modeViews} />
    );
}
