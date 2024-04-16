
import CommonEditInputControl from 'pages/common/views/CommonEditInputControl';
import CommonEditSelectControl from 'pages/common/views/CommonEditSelectControl';
import CommonEditView from 'pages/common/views/CommonEditView';
import ICommonStyle from 'pages/common/views/ICommonStyle';
import IStyledViewProps from 'pages/common/views/IStyledViewProps';

import IBudgetCategoryEditViewModel from '../viewModels/IBudgetCategoryEditViewModel';

export default function BudgetCategoryEditView({ dataContext, styleContext }: IStyledViewProps) {

    const viewModel = dataContext as IBudgetCategoryEditViewModel;
    const style = styleContext as ICommonStyle;

    return (
        <CommonEditView dataContext={dataContext} styleContext={styleContext}>
            <CommonEditSelectControl style={style}
                name='sectionId'
                label='Section'
                value={viewModel.category.sectionId}
                isValid={viewModel.isValidSectionId}
                options={viewModel.sections}
                defaultOption='Select a Section'
                setProperty={viewModel.setProperty} />
            <CommonEditInputControl style={style}
                name='name'
                label='Category Name'
                value={viewModel.category.name}
                isValid={viewModel.isValidName}
                setProperty={viewModel.setProperty} />
            <CommonEditInputControl style={style}
                name='description'
                label='Description'
                value={viewModel.category.description}
                isValid={viewModel.isValidDescription}
                setProperty={viewModel.setProperty} />
        </CommonEditView>
    );
}
