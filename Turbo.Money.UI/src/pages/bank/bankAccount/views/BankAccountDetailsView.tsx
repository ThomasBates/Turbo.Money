
import CommonDetailsField from 'pages/common/views/CommonDetailsField';
import CommonDetailsView from 'pages/common/views/CommonDetailsView';
import ICommonStyle from 'pages/common/views/ICommonStyle';
import IStyledViewProps from 'pages/common/views/IStyledViewProps';

import IBankAccountDetailsViewModel from '../viewModels/IBankAccountDetailsViewModel';

export default function BankAccountDetailsView({ dataContext, styleContext }: IStyledViewProps) {

    const viewModel = dataContext as IBankAccountDetailsViewModel
    const style = styleContext as ICommonStyle;

    return (
        <CommonDetailsView dataContext={dataContext} styleContext={styleContext}>
            {viewModel.showDetails && <>
                <CommonDetailsField style={style} label="Bank Name" value={viewModel.bankName} />
                <CommonDetailsField style={style} label="Account Name" value={viewModel.account.name} />
                <CommonDetailsField style={style} label="Description" value={viewModel.account.description} />
                <CommonDetailsField style={style} label="Account Number" value={viewModel.account.number} />
            </>}
        </CommonDetailsView>
    );
}
