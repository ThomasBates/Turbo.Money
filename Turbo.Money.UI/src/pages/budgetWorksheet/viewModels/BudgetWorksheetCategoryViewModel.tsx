import React from "react";

import BudgetWorksheetAccountViewModel from "./BudgetWorksheetAccountViewModel";

export default function BudgetWorksheetCategoryViewModel(
    category,
    dataService,
    setModeItem,
    setModeViewModelProps) {

    const accountViewModels = dataService.listBudgetAccounts(category)
            .map(account => BudgetWorksheetAccountViewModel(
                account,
                dataService,
                setModeItem,
                setModeViewModelProps));

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
            sections: dataService.listBudgetSectionNames(),
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
            list: dataService.listBudgetCategoryNames(),
            sections: dataService.listBudgetSectionNames(),
            onSubmitted: onEditSubmitted,
            onCancelled: onModeCancelled
        });
    }

    const onEditSubmitted = (editedCategory) => {
        dataService.updateBudgetCategory(editedCategory);
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
            sections: dataService.listBudgetSectionNames(),
            onSubmitted: onDeleteSubmitted,
            onCancelled: onModeCancelled
        });
    }

    const onDeleteSubmitted = (categoryToDelete) => {
        dataService.deleteBudgetCategory(categoryToDelete);
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
            list: dataService.listBudgetAccountNames(),
            categories: dataService.listBudgetCategoryNames(),
            onSubmitted: onAddSubmitted,
            onCancelled: onModeCancelled
        });
    };

    const onAddSubmitted = (accountToAdd) => {
        dataService.createBudgetAccount(accountToAdd);
        setModeViewModelProps(null);
    };

    return {
        name: category.name,
        accountViewModels,
        total: dataService.getBudgetCategoryTotal(category),

        showCategory,
        editCategory,
        deleteCategory,

        addAccount,
    }
};
