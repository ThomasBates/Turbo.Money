
import CommonDetailsField from 'pages/common/views/CommonDetailsField';
import CommonDetailsView from 'pages/common/views/CommonDetailsView';
import ICommonStyle from 'pages/common/views/ICommonStyle';
import IStyledViewProps from 'pages/common/views/IStyledViewProps';

import IBankBankDetailsViewModel from '../viewModels/IBankBankDetailsViewModel';

export default function BankBankDetailsView({ dataContext, styleContext }: IStyledViewProps) {

    const viewModel = dataContext as IBankBankDetailsViewModel;
    const style = styleContext as ICommonStyle;

    return (
        <CommonDetailsView dataContext={dataContext} styleContext={styleContext}>
            {viewModel.showDetails && <>
                <CommonDetailsField style={style} label="Bank Name" value={viewModel.bank.name} />
                <CommonDetailsField style={style} label="Description" value={viewModel.bank.description} />
                <CommonDetailsField style={style} label="Bank Number" value={viewModel.bank.number} />
                <CommonDetailsField style={style} label="Bank Branch" value={viewModel.bank.branch} />
            </>}
        </CommonDetailsView>
    );
}
