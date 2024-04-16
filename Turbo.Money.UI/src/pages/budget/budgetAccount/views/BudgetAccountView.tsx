
import CommonView from 'pages/common/views/CommonView';
import ICommonModeViews from 'pages/common/views/ICommonModeViews';
import IFactoryViewProps from 'pages/common/views/IFactoryViewProps';

import BudgetAccountDetailsView from './BudgetAccountDetailsView';
import BudgetAccountEditView from './BudgetAccountEditView';

const modeViews: ICommonModeViews = {
    details: BudgetAccountDetailsView,
    add: BudgetAccountEditView,
    edit: BudgetAccountEditView,
    delete: BudgetAccountDetailsView,
    none: BudgetAccountDetailsView
}

export default function BudgetAccountView({ dataContext }: IFactoryViewProps) {
    return (
        <CommonView dataContext={dataContext} modeViews={modeViews} />
    );
}
