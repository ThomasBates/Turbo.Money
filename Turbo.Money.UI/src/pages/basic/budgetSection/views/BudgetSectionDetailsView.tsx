
import IStyledViewProps from 'common/views/IStyledViewProps';

import BasicDetailsField from 'pages/basic/common/views/BasicDetailsField';
import BasicDetailsView from 'pages/basic/common/views/BasicDetailsView';

import IBudgetSectionDetailsViewModel from '../viewModels/IBudgetSectionDetailsViewModel';

export default function BankDetailsView({ style, dataContext }: IStyledViewProps) {

    const viewModel = dataContext as IBudgetSectionDetailsViewModel;

    return (
        <BasicDetailsView dataContext={dataContext} style={style}>
            {viewModel.showDetails && <>
                <BasicDetailsField style={style} label="Section Name" value={viewModel.section.name} />
                <BasicDetailsField style={style} label="Description" value={viewModel.section.description} />
                <BasicDetailsField style={style} label="Income/Expenses" value={viewModel.section.direction == "in" ? "Income" : "Expenses"} />
            </>}
        </BasicDetailsView>
    );
}
