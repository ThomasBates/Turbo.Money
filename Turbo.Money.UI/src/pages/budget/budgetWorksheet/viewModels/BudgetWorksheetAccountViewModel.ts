
import IBudgetAccount from 'models/budget/IBudgetAccount';
import ICommonItem from 'models/common/ICommonItem';

import ICommonModeViewModelProps from 'pages/common/viewModels/ICommonModeViewModelProps';

import ILoggerService from 'services/logger/ILoggerService';

import { IBudgetItem, IBudgetWorksheetDataService } from "../data/IBudgetWorksheetDataService";

import IBudgetWorksheetAccountViewModel from './IBudgetWorksheetAccountViewModel';

export default function BudgetWorksheetAccountViewModel(
    _logger: ILoggerService,
    account: IBudgetAccount,
    dataService: IBudgetWorksheetDataService,
    setModeItem: (item: IBudgetItem | null) => void,
    setModeViewModelProps: (props: null | ICommonModeViewModelProps) => void): IBudgetWorksheetAccountViewModel {

    const amountTypes: Record<string, string> = {
        "min": "Minimum",
        "fix": "Fixed",
        "max": "Maximum",
        "est": "Estimate",
        "avg": "Average"
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
        setModeItem(accountToShow as IBudgetItem);
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
        setModeItem(accountToEdit as IBudgetItem);
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

    const onEditSubmitted = (item: ICommonItem) => {
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
        setModeItem(accountToDelete as IBudgetItem);
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

    const onDeleteSubmitted = (item: ICommonItem) => {
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
