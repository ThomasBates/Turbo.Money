
import CommonEditInputControl from 'pages/common/views/CommonEditInputControl';
import CommonEditSelectControl from 'pages/common/views/CommonEditSelectControl';
import CommonEditView from 'pages/common/views/CommonEditView';
import ICommonStyle from 'pages/common/views/ICommonStyle';
import IStyledViewProps from 'pages/common/views/IStyledViewProps';

import IBudgetAccountEditViewModel from '../viewModels/IBudgetAccountEditViewModel';

export default function BudgetAccountEditView({ dataContext, styleContext }: IStyledViewProps) {

    const viewModel = dataContext as IBudgetAccountEditViewModel;
    const style = styleContext as ICommonStyle;

    return (
        <CommonEditView dataContext={dataContext} styleContext={styleContext}>
            <CommonEditSelectControl style={style}
                name='categoryId'
                label='Category'
                value={viewModel.account.categoryId}
                isValid={viewModel.isValidCategoryId}
                options={viewModel.categories}
                defaultOption='Select a Category'
                setProperty={viewModel.setProperty} />
            <CommonEditInputControl style={style}
                name='name'
                label='Account Name'
                value={viewModel.account.name}
                isValid={viewModel.isValidName}
                setProperty={viewModel.setProperty} />
            <CommonEditInputControl style={style}
                name='description'
                label='Description'
                value={viewModel.account.description}
                isValid={viewModel.isValidDescription}
                setProperty={viewModel.setProperty} />
            <CommonEditInputControl style={style}
                name='amount'
                label='Budgeted Amount'
                value={viewModel.account.amount}
                isValid={viewModel.isValidAmount}
                setProperty={viewModel.setProperty} />
            <CommonEditSelectControl style={style}
                name='type'
                label='Amount Type'
                value={viewModel.account.type}
                isValid={viewModel.isValidType}
                options={viewModel.amountTypes}
                setProperty={viewModel.setProperty} />
            <CommonEditInputControl style={style}
                name='method'
                label='Payment Method'
                value={viewModel.account.method}
                isValid={viewModel.isValidMethod}
                setProperty={viewModel.setProperty} />
        </CommonEditView>
    );
}