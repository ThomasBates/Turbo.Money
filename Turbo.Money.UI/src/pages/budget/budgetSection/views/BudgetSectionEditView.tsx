
import CommonEditInputControl from 'pages/common/views/CommonEditInputControl';
import CommonEditSelectControl from 'pages/common/views/CommonEditSelectControl';
import CommonEditView from 'pages/common/views/CommonEditView';
import ICommonStyle from 'pages/common/views/ICommonStyle';
import IStyledViewProps from 'pages/common/views/IStyledViewProps';

import IBudgetSectionEditViewModel from '../viewModels/IBudgetSectionEditViewModel';

export default function BudgetSectionEditView({ dataContext, styleContext }: IStyledViewProps) {

    const viewModel = dataContext as IBudgetSectionEditViewModel;
    const style = styleContext as ICommonStyle;

    return (
        <CommonEditView dataContext={dataContext} styleContext={styleContext}>
            <CommonEditInputControl style={style}
                name='name'
                label='Section Name'
                value={viewModel.section.name}
                isValid={viewModel.isValidName}
                setProperty={viewModel.setProperty} />
            <CommonEditInputControl style={style}
                name='description'
                label='Description'
                value={viewModel.section.description}
                isValid={viewModel.isValidDescription}
                setProperty={viewModel.setProperty} />
            <CommonEditSelectControl style={style}
                name='categoryId'
                label='Income/Expenses'
                value={viewModel.section.categoryId}
                isValid={viewModel.isValidDirection}
                options={[
                    { value: 'out', text: 'Expenses' },
                    { value: 'in', text: 'Income' }]}
                setProperty={viewModel.setProperty} />
        </CommonEditView>
    );
}
