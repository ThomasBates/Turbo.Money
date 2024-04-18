
import IStyledViewProps from 'common/views/IStyledViewProps';

import BasicEditInputControl from 'pages/basic/common/views/BasicEditInputControl';
import BasicEditSelectControl from 'pages/basic/common/views/BasicEditSelectControl';
import BasicEditView from 'pages/basic/common/views/BasicEditView';

import IBudgetCategoryEditViewModel from '../viewModels/IBudgetCategoryEditViewModel';

export default function BudgetCategoryEditView({ style, dataContext }: IStyledViewProps) {

    const viewModel = dataContext as IBudgetCategoryEditViewModel;

    return (
        <BasicEditView dataContext={dataContext} style={style}>
            <BasicEditSelectControl style={style}
                name='sectionId'
                label='Section'
                value={viewModel.category.sectionId}
                isValid={viewModel.isValidSectionId}
                options={viewModel.sections}
                defaultOption='Select a Section'
                setProperty={viewModel.setProperty} />
            <BasicEditInputControl style={style}
                name='name'
                label='Category Name'
                value={viewModel.category.name}
                isValid={viewModel.isValidName}
                setProperty={viewModel.setProperty} />
            <BasicEditInputControl style={style}
                name='description'
                label='Description'
                value={viewModel.category.description}
                isValid={viewModel.isValidDescription}
                setProperty={viewModel.setProperty} />
        </BasicEditView>
    );
}
