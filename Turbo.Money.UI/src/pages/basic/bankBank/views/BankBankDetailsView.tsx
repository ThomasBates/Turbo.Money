
import IStyledViewProps from 'common/views/IStyledViewProps';

import BasicDetailsField from 'pages/basic/common/views/BasicDetailsField';
import BasicDetailsView from 'pages/basic/common/views/BasicDetailsView';

import IBankBankDetailsViewModel from '../viewModels/IBankBankDetailsViewModel';

export default function BankBankDetailsView({ style, dataContext }: IStyledViewProps) {

    const viewModel = dataContext as IBankBankDetailsViewModel;

    return (
        <BasicDetailsView dataContext={dataContext} style={style}>
            {viewModel.showDetails && <>
                <BasicDetailsField style={style} label="Bank Name" value={viewModel.bank.name} />
                <BasicDetailsField style={style} label="Description" value={viewModel.bank.description} />
                <BasicDetailsField style={style} label="Bank Number" value={viewModel.bank.number} />
                <BasicDetailsField style={style} label="Bank Branch" value={viewModel.bank.branch} />
            </>}
        </BasicDetailsView>
    );
}
