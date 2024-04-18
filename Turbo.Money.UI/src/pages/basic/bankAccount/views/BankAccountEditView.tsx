
import IStyledViewProps from 'common/views/IStyledViewProps';

import BasicEditInputControl from 'pages/basic/common/views/BasicEditInputControl';
import BasicEditSelectControl from 'pages/basic/common/views/BasicEditSelectControl';
import BasicEditView from 'pages/basic/common/views/BasicEditView';

import IBankAccountEditViewModel from '../viewModels/IBankAccountEditViewModel';

export default function BankAccountEditView({ style, dataContext }: IStyledViewProps) {

    const viewModel = dataContext as IBankAccountEditViewModel;

    return (
        <BasicEditView dataContext={dataContext} style={style}>
            <BasicEditSelectControl style={style}
                name='bankId'
                label='Bank'
                value={viewModel.account.bankId}
                isValid={viewModel.isValidBankId}
                options={viewModel.banks}
                defaultOption='Select a Bank'
                setProperty={viewModel.setProperty} />
            <BasicEditInputControl style={style}
                name='name'
                label='Account Name'
                value={viewModel.account.name}
                isValid={viewModel.isValidName}
                setProperty={viewModel.setProperty} />
            <BasicEditInputControl style={style}
                name='description'
                label='Description'
                value={viewModel.account.description}
                setProperty={viewModel.setProperty} />
            <BasicEditInputControl style={style}
                name='number'
                label='Account Number'
                value={viewModel.account.name}
                isValid={viewModel.isValidNumber}
                setProperty={viewModel.setProperty} />
        </BasicEditView>
    );
}
