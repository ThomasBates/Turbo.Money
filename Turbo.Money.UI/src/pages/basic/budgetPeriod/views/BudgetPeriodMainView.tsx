
import IFactoryViewProps from 'common/views/IFactoryViewProps';
import IStyledViewProps from 'common/views/IStyledViewProps';

import IBudgetPeriod from 'models/budget/IBudgetPeriod';

import BasicButton from 'pages/basic/common/views/BasicButton';
import BasicMainView from 'pages/basic/common/views/BasicMainView';
import IBasicModeViews from 'pages/basic/common/views/IBasicModeViews';
import IBasicListItemProps from 'pages/basic/common/views/IBasicListItemProps';

import { formatDate } from 'services/tools/tools';

import IBudgetPeriodMainViewModel from '../viewModels/IBudgetPeriodMainViewModel';

import BudgetPeriodDetailsView from './BudgetPeriodDetailsView';
import BudgetPeriodEditView from './BudgetPeriodEditView';

import styleModule from './BudgetPeriod.module.css';


const modeViews: IBasicModeViews = {
    details: BudgetPeriodDetailsView,
    add: BudgetPeriodEditView,
    edit: BudgetPeriodEditView,
    delete: BudgetPeriodDetailsView,
    none: BudgetPeriodDetailsView
}

const ListHeader = ({style, dataContext }: IStyledViewProps) => {
    const viewModel = dataContext as IBudgetPeriodMainViewModel;

    return (
        <div className={style.button_panel}>
            <BasicButton style={style}
                variant='add'
                label='Sandbox'
                onClick={viewModel.loadSandbox}
                disabled={!viewModel.canLoadSandbox} />
            <BasicButton style={style}
                variant='edit'
                label='Open'
                onClick={viewModel.loadOpen}
                disabled={!viewModel.canLoadOpen} />
            <BasicButton style={style}
                variant='delete'
                label='Closed'
                onClick={viewModel.loadClosed}
                disabled={!viewModel.canLoadClosed} />
        </div>
    )
}

const TableHeader = ({ style, dataContext }: IStyledViewProps) => {
    const viewModel = dataContext as IBudgetPeriodMainViewModel;


    if (viewModel.isSandbox) {
        return (
            <thead className={style.period_table_header}>
                <tr>
                    <td>Name</td>
                    <td>Description</td>
                </tr>
            </thead>
        )
    }
    else {
        return (
            <thead className={style.period_table_header}>
                <tr>
                    <td>Start</td>
                    <td>End</td>
                </tr>
            </thead>
        )
    }
}

const ListItem = ({ listItem }: IBasicListItemProps) => {
    const period = listItem as IBudgetPeriod;

    if (period.isSandbox) {
        return (<>
            <td>{period.name}</td>
            <td>{period.description}</td>
        </>)
    }
    else {
        return (<>
            <td>{formatDate(period.start)}</td>
            <td>{formatDate(period.end)}</td>
        </>)
    }
}

export default function BudgetPeriodMainView({ dataContext }: IFactoryViewProps) {

    return (
        <BasicMainView
            dataContext={dataContext}
            customStyle={styleModule}
            modeViews={modeViews}
            CustomListHeader={ListHeader}
            CustomTableHeader={TableHeader}
            CustomListItem={ListItem} />
    );
}
