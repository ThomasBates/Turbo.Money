
import IStyledViewProps from 'common/views/IStyledViewProps';

import BasicEditInputControl from 'pages/basic/common/views/BasicEditInputControl';
import BasicEditSelectControl from 'pages/basic/common/views/BasicEditSelectControl';
import BasicEditView from 'pages/basic/common/views/BasicEditView';

import IBudgetSectionEditViewModel from '../viewModels/IBudgetSectionEditViewModel';

export default function BudgetSectionEditView({ style, dataContext }: IStyledViewProps) {

    const viewModel = dataContext as IBudgetSectionEditViewModel;

    return (
        <BasicEditView dataContext={dataContext} style={style}>
            <BasicEditInputControl style={style}
                name='name'
                label='Section Name'
                value={viewModel.section.name}
                isValid={viewModel.isValidName}
                setProperty={viewModel.setProperty} />
            <BasicEditInputControl style={style}
                name='description'
                label='Description'
                value={viewModel.section.description}
                isValid={viewModel.isValidDescription}
                setProperty={viewModel.setProperty} />
            <BasicEditSelectControl style={style}
                name='direction'
                label='Income/Expenses'
                value={viewModel.section.direction}
                isValid={viewModel.isValidDirection}
                options={[
                    { value: 'out', text: 'Expenses' },
                    { value: 'in', text: 'Income' }]}
                setProperty={viewModel.setProperty} />
        </BasicEditView>
    );
}
