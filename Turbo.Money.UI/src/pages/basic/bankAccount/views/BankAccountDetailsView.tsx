
import IStyledViewProps from 'common/views/IStyledViewProps';

import BasicDetailsField from 'pages/basic/common/views/BasicDetailsField';
import BasicDetailsView from 'pages/basic/common/views/BasicDetailsView';

import IBankAccountDetailsViewModel from '../viewModels/IBankAccountDetailsViewModel';

export default function BankAccountDetailsView({ style, dataContext }: IStyledViewProps) {

    const viewModel = dataContext as IBankAccountDetailsViewModel

    return (
        <BasicDetailsView dataContext={dataContext} style={style}>
            {viewModel.showDetails && <>
                <BasicDetailsField style={style} label="Bank Name" value={viewModel.bankName} />
                <BasicDetailsField style={style} label="Account Name" value={viewModel.account.name} />
                <BasicDetailsField style={style} label="Description" value={viewModel.account.description} />
                <BasicDetailsField style={style} label="Account Number" value={viewModel.account.number} />
            </>}
        </BasicDetailsView>
    );
}
