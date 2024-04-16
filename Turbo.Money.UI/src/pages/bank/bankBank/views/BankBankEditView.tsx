
import CommonEditInputControl from 'pages/common/views/CommonEditInputControl';
import CommonEditView from 'pages/common/views/CommonEditView';
import ICommonStyle from 'pages/common/views/ICommonStyle';
import IStyledViewProps from 'pages/common/views/IStyledViewProps';

import IBankBankEditViewModel from '../viewModels/IBankBankEditViewModel';

export default function BankBankEditView({ dataContext, styleContext }: IStyledViewProps) {

    const viewModel = dataContext as IBankBankEditViewModel;
    const style = styleContext as ICommonStyle;

    return (
        <CommonEditView dataContext={dataContext} styleContext={styleContext}>
            <CommonEditInputControl style={style}
                name='name'
                label='Bank Name'
                value={viewModel.bank.name}
                isValid={viewModel.isValidName}
                setProperty={viewModel.setProperty} />
            <CommonEditInputControl style={style}
                name='description'
                label='Description'
                value={viewModel.bank.description}
                setProperty={viewModel.setProperty} />
            <CommonEditInputControl style={style}
                name='number'
                label='Bank Number'
                value={viewModel.bank.number}
                isValid={viewModel.isValidNumber}
                setProperty={viewModel.setProperty} />
            <CommonEditInputControl style={style}
                name='branch'
                label='Bank Branch'
                value={viewModel.bank.branch}
                isValid={viewModel.isValidBranch}
                setProperty={viewModel.setProperty} />
        </CommonEditView>
    );
}
