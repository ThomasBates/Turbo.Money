
import IFactoryViewProps from 'common/views/IFactoryViewProps';

import BasicMainView from 'pages/basic/common/views/BasicMainView';
import IBasicModeViews from 'pages/basic/common/views/IBasicModeViews';

import BudgetAccountDetailsView from './BudgetAccountDetailsView';
import BudgetAccountEditView from './BudgetAccountEditView';

const modeViews: IBasicModeViews = {
    details: BudgetAccountDetailsView,
    add: BudgetAccountEditView,
    edit: BudgetAccountEditView,
    delete: BudgetAccountDetailsView,
    none: BudgetAccountDetailsView
}

export default function BudgetAccountMainView({ dataContext }: IFactoryViewProps) {
    return (
        <BasicMainView dataContext={dataContext} modeViews={modeViews} />
    );
}
