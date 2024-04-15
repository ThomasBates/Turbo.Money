
import CommonView from 'pages/common/views/CommonView';
import ICommonModeViews from 'pages/common/views/ICommonModeViews';
import IViewFactoryProps from 'pages/common/views/IViewFactoryProps';

import BankBankDetailsView from './BankBankDetailsView';
import BankBankEditView from './BankBankEditView';

const modeViews: ICommonModeViews = {
    details: BankBankDetailsView,
    add: BankBankEditView,
    edit: BankBankEditView,
    delete: BankBankDetailsView,
    none: BankBankDetailsView
}

export default function BankBankView({ dataContext }: IViewFactoryProps) {
    return (
        <CommonView dataContext={dataContext} modeViews={modeViews} />
    );
}
