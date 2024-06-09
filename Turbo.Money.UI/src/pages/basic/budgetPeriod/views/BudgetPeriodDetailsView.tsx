
import IStyledViewProps from 'common/views/IStyledViewProps';

import BasicDetailsField from 'pages/basic/common/views/BasicDetailsField';
import BasicDetailsView from 'pages/basic/common/views/BasicDetailsView';

import { formatDate } from 'services/tools/tools';

import IBudgetPeriodDetailsViewModel from '../viewModels/IBudgetPeriodDetailsViewModel';

export default function BudgetPeriodDetailsView({ style, dataContext }: IStyledViewProps) {

    const viewModel = dataContext as IBudgetPeriodDetailsViewModel;

    return (
        <BasicDetailsView dataContext={dataContext} style={style}>
            {viewModel.showDetails && (viewModel.period.isSandbox
                ? <>
                    <BasicDetailsField style={style} label="Period Name" value={viewModel.period.name} />
                    <BasicDetailsField style={style} label="Description" value={viewModel.period.description} />
                </>
                : <>
                    <BasicDetailsField style={style} label="Period Start" value={formatDate(viewModel.period.start)} />
                    <BasicDetailsField style={style} label="Period End" value={formatDate(viewModel.period.end)} />
                </>)}
        </BasicDetailsView>
    );
}
