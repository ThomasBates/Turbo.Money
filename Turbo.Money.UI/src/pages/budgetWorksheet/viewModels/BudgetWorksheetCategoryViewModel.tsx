import React from "react";

import BudgetWorksheetAccountViewModel from "./BudgetWorksheetAccountViewModel";

const BudgetWorksheetCategoryViewModel = (
    category,
    sectionList,
    categoryList,
    accountList,
    setModeItem,
    setModeViewModelProps) => {

    const accountViewModels = category.accounts &&
        category.accounts
            .filter(account => account.state != "deleted")
            .map(account => BudgetWorksheetAccountViewModel(
                account,
                categoryList,
                accountList,
                setModeItem,
                setModeViewModelProps));

    let totalValue = category.accounts.reduce(
        (sum, account) => Number(sum) + Number(account.amount), 0);

    const localeFormat = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });

    const formattedTotal = localeFormat.format(totalValue);

    const compareAccounts = (account1, account2) => {
        const name1 = account1.name.toUpperCase();
        const name2 = account2.name.toUpperCase();
        if (name1 > name2) {
            return 1;
        }
        if (name1 < name2) {
            return -1;
        }
        return 0;
    }

    const showCategory = () => {
        var categoryToShow = {
            id: category.id,
            name: category.name,
            description: category.description,
            sectionId: category.sectionId,
        };
        setModeItem(categoryToShow);
        setModeViewModelProps({
            entity: "BudgetCategory",
            mode: "show",
            item: categoryToShow,
            sections: sectionList,
            onSubmitted: null,
            onCancelled: onModeCancelled
        });
    }

    const onModeCancelled = () => {
        setModeViewModelProps(null);
    };

    const editCategory = () => {
        var categoryToEdit = {
            id: category.id,
            name: category.name,
            description: category.description,
            sectionId: category.sectionId,
        };
        setModeItem(categoryToEdit);
        setModeViewModelProps({
            entity: "BudgetCategory",
            mode: "edit",
            item: categoryToEdit,
            setItem: setModeItem,
            list: categoryList,
            sections: sectionList,
            onSubmitted: onEditSubmitted,
            onCancelled: onModeCancelled
        });
    }

    const onEditSubmitted = (editedCategory) => {
        category.name = editedCategory.name;
        category.description = editedCategory.description;
        category.direction = editedCategory.direction;
        category.state = "updated";

        setModeViewModelProps(null);
    };

    const deleteCategory = () => {
        var categoryToDelete = {
            id: category.id,
            name: category.name,
            description: category.description,
            sectionId: category.sectionId,
        };
        setModeItem(categoryToDelete);
        setModeViewModelProps({
            entity: "BudgetCategory",
            mode: "delete",
            item: categoryToDelete,
            sections: sectionList,
            onSubmitted: onDeleteSubmitted,
            onCancelled: onModeCancelled
        });
    }

    const onDeleteSubmitted = (categoryToDelete) => {
        category.state = "deleted";

        setModeViewModelProps(null);
    };

    const addAccount = () => {
        var accountToAdd = {
            id: -1,
            name: "",
            description: "",
            categoryId: category.id,
            amount: 0,
            type: "max",
            method: "",

        };
        setModeItem(accountToAdd);
        setModeViewModelProps({
            entity: "BudgetAccount",
            mode: "add",
            item: accountToAdd,
            setItem: setModeItem,
            list: accountList,
            categories: categoryList,
            onSubmitted: onAddSubmitted,
            onCancelled: onModeCancelled
        });
    };

    const onAddSubmitted = (accountToAdd) => {
        const minID = accountList.reduce(
            (min, account) => Number(min) < Number(account.id) ? Number(min) : Number(account.id), 0);
        accountToAdd.id = minID - 1;
        accountToAdd.state = "created";

        category.accounts = [...category.accounts, accountToAdd].sort(compareAccounts);

        setModeViewModelProps(null);
    };

    return {
        name: category.name,
        accountViewModels,
        total: formattedTotal,

        showCategory,
        editCategory,
        deleteCategory,

        addAccount,
    }
};

export default BudgetWorksheetCategoryViewModel;