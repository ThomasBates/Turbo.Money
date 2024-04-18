
import IFactoryViewProps from 'common/views/IFactoryViewProps';

import BasicMainView from 'pages/basic/common/views/BasicMainView';
import IBasicModeViews from 'pages/basic/common/views/IBasicModeViews';

import BankAccountDetailsView from './BankAccountDetailsView';
import BankAccountEditView from './BankAccountEditView';

const modeViews: IBasicModeViews = {
    details: BankAccountDetailsView,
    add: BankAccountEditView,
    edit: BankAccountEditView,
    delete: BankAccountDetailsView,
    none: BankAccountDetailsView
}

export default function BankAccountMainView({ dataContext }: IFactoryViewProps) {
    return (
        <BasicMainView dataContext={dataContext} modeViews={modeViews} />
    );
}
