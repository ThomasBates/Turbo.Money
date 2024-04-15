
import CommonView from 'pages/common/views/CommonView';
import ICommonModeViews from 'pages/common/views/ICommonModeViews';
import IViewFactoryProps from 'pages/common/views/IViewFactoryProps';

import BankAccountDetailsView from './BankAccountDetailsView';
import BankAccountEditView from './BankAccountEditView';

const modeViews: ICommonModeViews = {
    details: BankAccountDetailsView,
    add: BankAccountEditView,
    edit: BankAccountEditView,
    delete: BankAccountDetailsView,
    none: BankAccountDetailsView
}

export default function BankAccountView({ dataContext }: IViewFactoryProps) {
    return (
        <CommonView dataContext={dataContext} modeViews={modeViews} />
    );
}
