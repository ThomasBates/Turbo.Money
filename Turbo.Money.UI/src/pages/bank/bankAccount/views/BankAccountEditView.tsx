
import CommonEditInputControl from 'pages/common/views/CommonEditInputControl';
import CommonEditSelectControl from 'pages/common/views/CommonEditSelectControl';
import CommonEditView from 'pages/common/views/CommonEditView';
import ICommonStyle from 'pages/common/views/ICommonStyle';
import IStyledViewProps from 'pages/common/views/IStyledViewProps';

import IBankAccountEditViewModel from '../viewModels/IBankAccountEditViewModel';

export default function BankAccountEditView({ dataContext, styleContext }: IStyledViewProps) {

    const viewModel = dataContext as IBankAccountEditViewModel;
    const style = styleContext as ICommonStyle;

    return (
        <CommonEditView dataContext={dataContext} styleContext={styleContext}>
            <CommonEditSelectControl style={style}
                name='bankId'
                label='Bank'
                value={viewModel.account.bankId}
                isValid={viewModel.isValidBankId}
                options={viewModel.banks}
                defaultOption='Select a Bank'
                setProperty={viewModel.setProperty} />
            <CommonEditInputControl style={style}
                name='name'
                label='Account Name'
                value={viewModel.account.name}
                isValid={viewModel.isValidName}
                setProperty={viewModel.setProperty} />
            <CommonEditInputControl style={style}
                name='description'
                label='Description'
                value={viewModel.account.description}
                setProperty={viewModel.setProperty} />
            <CommonEditInputControl style={style}
                name='number'
                label='Account Number'
                value={viewModel.account.name}
                isValid={viewModel.isValidNumber}
                setProperty={viewModel.setProperty} />
        </CommonEditView>
    );
}
