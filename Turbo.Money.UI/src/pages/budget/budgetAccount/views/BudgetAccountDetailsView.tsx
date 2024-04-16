
import CommonDetailsField from 'pages/common/views/CommonDetailsField';
import CommonDetailsView from 'pages/common/views/CommonDetailsView';
import ICommonStyle from 'pages/common/views/ICommonStyle';
import IStyledViewProps from 'pages/common/views/IStyledViewProps';

import IBudgetAccountDetailsViewModel from '../viewModels/IBudgetAccountDetailsViewModel';

export default function BudgetAccountDetailsView({ dataContext, styleContext }: IStyledViewProps) {

    const viewModel = dataContext as IBudgetAccountDetailsViewModel;
    const style = styleContext as ICommonStyle;

    return (
        <CommonDetailsView dataContext={dataContext} styleContext={styleContext}>
            {viewModel.showDetails && <>
                <CommonDetailsField style={style} label="Budget Category" value={viewModel.categoryName} />
                <CommonDetailsField style={style} label="Account Name" value={viewModel.account.name} />
                <CommonDetailsField style={style} label="Description" value={viewModel.account.description} />
                <CommonDetailsField style={style} label="Budgeted Amount" value={viewModel.account.amount} />
                <CommonDetailsField style={style} label="Amount Type" value={viewModel.typeName} />
                <CommonDetailsField style={style} label="Payment Method" value={viewModel.account.method} />
            </>}
        </CommonDetailsView>
    );
}
