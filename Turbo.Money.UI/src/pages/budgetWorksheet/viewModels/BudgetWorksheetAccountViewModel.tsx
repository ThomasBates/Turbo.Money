import React from "react";

const BudgetWorksheetAccountViewModel = (
    account,
    categoryList,
    accountList,
    setModeItem,
    setModeViewModelProps) => {

    const amountTypes = {
        "min": "Minimum",
        "fix": "Fixed",
        "max": "Maximum",
        "est": "Estimate",
        "avg": "Average"
    };
    const typeName = account && amountTypes[account.type];

    const amountValue = Number(account.amount);

    const localeFormat = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });

    const formattedAmount = localeFormat.format(amountValue);

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
            categories: categoryList,
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
            list: accountList,
            categories: categoryList,
            onSubmitted: onEditSubmitted,
            onCancelled: onModeCancelled
        });
    }

    const onEditSubmitted = (editedAccount) => {
        account.name = editedAccount.name;
        account.description = editedAccount.description;
        account.categoryId = editedAccount.categoryId;
        account.amount = editedAccount.amount;
        account.type = editedAccount.type;
        account.method = editedAccount.method;
        account.state = "updated";

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
            categories: categoryList,
            onSubmitted: onDeleteSubmitted,
            onCancelled: onModeCancelled
        });
    }

    const onDeleteSubmitted = (accountToDelete) => {
        account.state = "deleted";

        setModeViewModelProps(null);
    };

    return {
        name: account.name,
        description: account.description,
        amount: formattedAmount,
        typeName: typeName,
        method: account.method,

        showAccount,
        editAccount,
        deleteAccount
    }
};

export default BudgetWorksheetAccountViewModel;