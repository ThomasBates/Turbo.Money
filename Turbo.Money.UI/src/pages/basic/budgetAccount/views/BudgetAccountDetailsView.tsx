
import IStyledViewProps from 'common/views/IStyledViewProps';

import BasicDetailsField from 'pages/basic/common/views/BasicDetailsField';
import BasicDetailsView from 'pages/basic/common/views/BasicDetailsView';

import IBudgetAccountDetailsViewModel from '../viewModels/IBudgetAccountDetailsViewModel';

export default function BudgetAccountDetailsView({ style, dataContext }: IStyledViewProps) {

    const viewModel = dataContext as IBudgetAccountDetailsViewModel;

    return (
        <BasicDetailsView dataContext={dataContext} style={style}>
            {viewModel.showDetails && <>
                <BasicDetailsField style={style} label="Budget Category" value={viewModel.categoryName} />
                <BasicDetailsField style={style} label="Account Name" value={viewModel.account.name} />
                <BasicDetailsField style={style} label="Description" value={viewModel.account.description} />
                <BasicDetailsField style={style} label="Budgeted Amount" value={viewModel.account.amount} />
                <BasicDetailsField style={style} label="Amount Type" value={viewModel.typeName} />
                <BasicDetailsField style={style} label="Payment Method" value={viewModel.account.method} />
            </>}
        </BasicDetailsView>
    );
}
