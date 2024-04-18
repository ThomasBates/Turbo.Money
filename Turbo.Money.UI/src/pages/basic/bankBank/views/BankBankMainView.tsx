
import IFactoryViewProps from 'common/views/IFactoryViewProps';

import BasicMainView from 'pages/basic/common/views/BasicMainView';
import IBasicModeViews from 'pages/basic/common/views/IBasicModeViews';

import BankBankDetailsView from './BankBankDetailsView';
import BankBankEditView from './BankBankEditView';

const modeViews: IBasicModeViews = {
    details: BankBankDetailsView,
    add: BankBankEditView,
    edit: BankBankEditView,
    delete: BankBankDetailsView,
    none: BankBankDetailsView
}

export default function BankBankMainView({ dataContext }: IFactoryViewProps) {
    return (
        <BasicMainView dataContext={dataContext} modeViews={modeViews} />
    );
}
