
import IStyledViewProps from 'common/views/IStyledViewProps';

import BasicEditInputControl from 'pages/basic/common/views/BasicEditInputControl';
import BasicEditView from 'pages/basic/common/views/BasicEditView';

import IBankBankEditViewModel from '../viewModels/IBankBankEditViewModel';

export default function BankBankEditView({ style, dataContext }: IStyledViewProps) {

    const viewModel = dataContext as IBankBankEditViewModel;

    return (
        <BasicEditView dataContext={dataContext} style={style}>
            <BasicEditInputControl style={style}
                name='name'
                label='Bank Name'
                value={viewModel.bank.name}
                isValid={viewModel.isValidName}
                setProperty={viewModel.setProperty} />
            <BasicEditInputControl style={style}
                name='description'
                label='Description'
                value={viewModel.bank.description}
                setProperty={viewModel.setProperty} />
            <BasicEditInputControl style={style}
                name='number'
                label='Bank Number'
                value={viewModel.bank.number}
                isValid={viewModel.isValidNumber}
                setProperty={viewModel.setProperty} />
            <BasicEditInputControl style={style}
                name='branch'
                label='Bank Branch'
                value={viewModel.bank.branch}
                isValid={viewModel.isValidBranch}
                setProperty={viewModel.setProperty} />
        </BasicEditView>
    );
}
