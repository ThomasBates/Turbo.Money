
import IStyledViewProps from 'common/views/IStyledViewProps';

import BasicEditInputControl from 'pages/basic/common/views/BasicEditInputControl';
import BasicEditSelectControl from 'pages/basic/common/views/BasicEditSelectControl';
import BasicEditView from 'pages/basic/common/views/BasicEditView';

import IBudgetAccountEditViewModel from '../viewModels/IBudgetAccountEditViewModel';

export default function BudgetAccountEditView({ style, dataContext }: IStyledViewProps) {

    const viewModel = dataContext as IBudgetAccountEditViewModel;

    return (
        <BasicEditView dataContext={dataContext} style={style}>
            <BasicEditSelectControl style={style}
                name='categoryId'
                label='Category'
                value={viewModel.account.categoryId}
                isValid={viewModel.isValidCategoryId}
                options={viewModel.categories}
                defaultOption='Select a Category'
                setProperty={viewModel.setProperty} />
            <BasicEditInputControl style={style}
                name='name'
                label='Account Name'
                value={viewModel.account.name}
                isValid={viewModel.isValidName}
                setProperty={viewModel.setProperty} />
            <BasicEditInputControl style={style}
                name='description'
                label='Description'
                value={viewModel.account.description}
                isValid={viewModel.isValidDescription}
                setProperty={viewModel.setProperty} />
            <BasicEditInputControl style={style}
                name='amount'
                label='Budgeted Amount'
                value={viewModel.account.amount}
                isValid={viewModel.isValidAmount}
                setProperty={viewModel.setProperty} />
            <BasicEditSelectControl style={style}
                name='type'
                label='Amount Type'
                value={viewModel.account.type}
                isValid={viewModel.isValidType}
                options={viewModel.amountTypes}
                setProperty={viewModel.setProperty} />
            <BasicEditInputControl style={style}
                name='method'
                label='Payment Method'
                value={viewModel.account.method}
                isValid={viewModel.isValidMethod}
                setProperty={viewModel.setProperty} />
        </BasicEditView>
    );
}