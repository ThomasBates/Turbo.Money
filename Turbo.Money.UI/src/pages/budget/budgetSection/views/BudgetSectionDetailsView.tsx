
import CommonDetailsField from 'pages/common/views/CommonDetailsField';
import CommonDetailsView from 'pages/common/views/CommonDetailsView';
import ICommonStyle from 'pages/common/views/ICommonStyle';
import IStyledViewProps from 'pages/common/views/IStyledViewProps';

import IBudgetSectionDetailsViewModel from '../viewModels/IBudgetSectionDetailsViewModel';

export default function BankDetailsView({ dataContext, styleContext }: IStyledViewProps) {

    const viewModel = dataContext as IBudgetSectionDetailsViewModel;
    const style = styleContext as ICommonStyle;

    return (
        <CommonDetailsView dataContext={dataContext} styleContext={styleContext}>
            {viewModel.showDetails && <>
                <CommonDetailsField style={style} label="Section Name" value={viewModel.section.name} />
                <CommonDetailsField style={style} label="Description" value={viewModel.section.description} />
                <CommonDetailsField style={style} label="Income/Expenses" value={viewModel.section.direction == "in" ? "Income" : "Expenses"} />
            </>}
        </CommonDetailsView>
    );
}
