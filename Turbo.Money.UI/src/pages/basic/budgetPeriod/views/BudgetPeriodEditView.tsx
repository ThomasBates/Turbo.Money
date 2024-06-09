
import IStyledViewProps from 'common/views/IStyledViewProps';

import BasicEditInputControl from 'pages/basic/common/views/BasicEditInputControl';
import BasicEditView from 'pages/basic/common/views/BasicEditView';

import IBudgetPeriodEditViewModel from '../viewModels/IBudgetPeriodEditViewModel';
import BasicEditDateControl from '../../common/views/BasicEditDateControl';
import BasicEditSelectControl from '../../common/views/BasicEditSelectControl';

export default function BudgetPeriodEditView({ style, dataContext }: IStyledViewProps) {

    const viewModel = dataContext as IBudgetPeriodEditViewModel;

    return (
        <BasicEditView dataContext={dataContext} style={style}>
            {viewModel.period.isSandbox
                ? <>
                    <BasicEditInputControl style={style}
                        name='name'
                        label='Period Name'
                        value={viewModel.period.name}
                        isValid={viewModel.isValidName}
                        setProperty={viewModel.setProperty} />
                    <BasicEditInputControl style={style}
                        name='description'
                        label='Description'
                        value={viewModel.period.description}
                        setProperty={viewModel.setProperty} />
                </> : <>
                    <BasicEditDateControl style={style}
                        name='start'
                        label='Period Start'
                        value={viewModel.period.start}
                        isValid={viewModel.isValidStart}
                        setProperty={viewModel.setProperty} />
                    <BasicEditDateControl style={style}
                        name='end'
                        label='Period End'
                        value={viewModel.period.end}
                        isValid={viewModel.isValidEnd}
                        setProperty={viewModel.setProperty} />
                </>}
            {(viewModel.mode == 'add') && (<>
                <BasicEditSelectControl style={style}
                    name='templateSet'
                    label='Template Set'
                    value={viewModel.period.templateSet.toString()}
                    //isValid={viewModel.isValidTemplateId}
                    options={viewModel.templateSetList}
                    //defaultOption='Select a Template'
                    setProperty={viewModel.setProperty} />
                <BasicEditSelectControl style={style}
                    name='templateId'
                    label='Template'
                    value={viewModel.period.templateId.toString()}
                    isValid={viewModel.isValidTemplateId}
                    options={viewModel.templateList}
                    defaultOption='Select a Period'
                    setProperty={viewModel.setProperty} />
            </>)}
        </BasicEditView>
    );
}
