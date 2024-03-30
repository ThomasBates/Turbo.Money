import React from "react";

export default function BudgetWorksheetAccountViewModel(
    account,
    dataService,
    setModeItem,
    setModeViewModelProps) {

    const amountTypes = {
        "min": "Minimum",
        "fix": "Fixed",
        "max": "Maximum",
        "est": "Estimate",
        "avg": "Average"
    };
    const typeName = account && amountTypes[account.type];

    const showAccount = () => {
        var accountToShow = {
            id: account.id,
            name: account.name,
            description: account.description,
            categoryId: account.categoryId,
            amount: account.amount,
            type: account.type,
            method: account.method,
        };
        setModeItem(accountToShow);
        setModeViewModelProps({
            entity: "BudgetAccount",
            mode: "show",
            item: accountToShow,
            categories: dataService.listBudgetCategoryNames(),
            onSubmitted: null,
            onCancelled: onModeCancelled
        });
    }

    const onModeCancelled = () => {
        setModeViewModelProps(null);
    };

    const editAccount = () => {
        var accountToEdit = {
            id: account.id,
            name: account.name,
            description: account.description,
            categoryId: account.categoryId,
            amount: account.amount,
            type: account.type,
            method: account.method,
        };
        setModeItem(accountToEdit);
        setModeViewModelProps({
            entity: "BudgetAccount",
            mode: "edit",
            item: accountToEdit,
            setItem: setModeItem,
            list: dataService.listBudgetAccountNames(),
            categories: dataService.listBudgetCategoryNames(),
            onSubmitted: onEditSubmitted,
            onCancelled: onModeCancelled
        });
    }

    const onEditSubmitted = (editedAccount) => {
        dataService.updateBudgetAccount(editedAccount);
        setModeViewModelProps(null);
    };

    const deleteAccount = () => {
        var accountToDelete = {
            id: account.id,
            name: account.name,
            description: account.description,
            categoryId: account.categoryId,
            amount: account.amount,
            type: account.type,
            method: account.method,
        };
        setModeItem(accountToDelete);
        setModeViewModelProps({
            entity: "BudgetAccount",
            mode: "delete",
            item: accountToDelete,
            categories: dataService.listBudgetCategoryNames(),
            onSubmitted: onDeleteSubmitted,
            onCancelled: onModeCancelled
        });
    }

    const onDeleteSubmitted = (accountToDelete) => {
        dataService.deleteBudgetAccount(accountToDelete);
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
};
