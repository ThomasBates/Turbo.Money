
import IModelItem from 'common/models/IModelItem';

import { BudgetAccountType } from 'models/budget/BudgetAccountType';
import IBudgetAccount from 'models/budget/IBudgetAccount';

import IBasicModeViewModelProps from 'pages/basic/common/viewModels/IBasicModeViewModelProps';

import ILoggerService from 'services/logger/ILoggerService';

import IBudgetWorksheetDataService from "../data/IBudgetWorksheetDataService";

import IBudgetWorksheetAccountViewModel from './IBudgetWorksheetAccountViewModel';

export default function BudgetWorksheetAccountViewModel(
    _logger: ILoggerService,
    account: IBudgetAccount,
    dataService: IBudgetWorksheetDataService,
    setModeItem: (item: IModelItem | null) => void,
    setModeViewModelProps: (props: null | IBasicModeViewModelProps) => void): IBudgetWorksheetAccountViewModel {

    const amountTypes: Record<BudgetAccountType, string> = {
        [BudgetAccountType.minimum]: "Minimum",
        [BudgetAccountType.fixed]: "Fixed",
        [BudgetAccountType.maximum]: "Maximum",
        [BudgetAccountType.estimate]: "Estimate",
        [BudgetAccountType.average]: "Average"
    };
    const typeName = account && amountTypes[account.type];

    const showAccount = () => {
        const accountToShow: IBudgetAccount = {
            id: account.id,
            name: account.name,
            description: account.description,
            categoryId: account.categoryId,
            amount: account.amount,
            type: account.type,
            method: account.method,
        };
        setModeItem(accountToShow as IModelItem);
        setModeViewModelProps({
            title: "Budget Account",
            entity: "BudgetAccount",
            mode: "show",
            item: accountToShow,
            parentList: dataService.listBudgetCategoryNames(),
            onCancelled: onModeCancelled
        });
    }

    const onModeCancelled = () => {
        setModeViewModelProps(null);
    };

    const editAccount = () => {
        const accountToEdit: IBudgetAccount = {
            id: account.id,
            name: account.name,
            description: account.description,
            categoryId: account.categoryId,
            amount: account.amount,
            type: account.type,
            method: account.method,
        };
        setModeItem(accountToEdit as IModelItem);
        setModeViewModelProps({
            title: "Budget Account",
            entity: "BudgetAccount",
            mode: "edit",
            item: accountToEdit,
            setItem: setModeItem,
            list: dataService.listBudgetAccountNames(),
            parentList: dataService.listBudgetCategoryNames(),
            onSubmitted: onEditSubmitted,
            onCancelled: onModeCancelled
        });
    }

    const onEditSubmitted = (item: IModelItem) => {
        dataService.updateBudgetAccount(item as IBudgetAccount);
        setModeViewModelProps(null);
    };

    const deleteAccount = () => {
        const accountToDelete = {
            id: account.id,
            name: account.name,
            description: account.description,
            categoryId: account.categoryId,
            amount: account.amount,
            type: account.type,
            method: account.method,
        };
        setModeItem(accountToDelete as IModelItem);
        setModeViewModelProps({
            title: "Budget Account",
            entity: "BudgetAccount",
            mode: "delete",
            item: accountToDelete,
            parentList: dataService.listBudgetCategoryNames(),
            onSubmitted: onDeleteSubmitted,
            onCancelled: onModeCancelled
        });
    }

    const onDeleteSubmitted = (item: IModelItem) => {
        dataService.deleteBudgetAccount(item as IBudgetAccount);
        setModeViewModelProps(null);
    };

    return {
        name: account.name,
        description: account.description,
        amount: dataService.getBudgetAccountTotal(account),
        typeName: typeName,
        method: account.method,

        showAccount,
        editAccount,
        deleteAccount
    }
}
