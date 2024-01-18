import React from "react";

import BudgetWorksheetCategoryViewModel from "./BudgetWorksheetCategoryViewModel";

const BudgetWorksheetSectionViewModel = (
    section,
    sectionList,
    categoryList,
    accountList,
    setModeItem,
    setModeViewModelProps) => {

    const categoryViewModels = section.categories &&
        section.categories
            .filter(category => category.state != "deleted")
            .map(category => BudgetWorksheetCategoryViewModel(
                category,
                sectionList,
                categoryList,
                accountList,
                setModeItem,
                setModeViewModelProps));

    let totalValue = section.categories.reduce(
        (sum, category) => Number(sum) + (
            category.accounts.reduce(
                (sum, account) => Number(sum) + Number(account.amount), 0)
        ), 0);

    const localeFormat = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });

    const formattedTotal = localeFormat.format(totalValue);

    const compareCategories = (category1, category2) => {
        const name1 = category1.name.toUpperCase();
        const name2 = category2.name.toUpperCase();
        if (name1 > name2) {
            return 1;
        }
        if (name1 < name2) {
            return -1;
        }
        return 0;
    }

    const showSection = () => {
        var modeItem = {
            id: section.id,
            name: section.name,
            description: section.description,
            direction: section.direction,
        };
        setModeItem(modeItem);
        setModeViewModelProps({
            entity: "BudgetSection",
            mode: "show",
            item: modeItem,
            onSubmitted: null,
            onCancelled: onModeCancelled
        });
    }

    const onModeCancelled = () => {
        setModeViewModelProps(null);
    };

    const editSection = () => {
        var sectionToEdit = {
            id: section.id,
            name: section.name,
            description: section.description,
            direction: section.direction,
        };
        setModeItem(sectionToEdit);
        setModeViewModelProps({
            entity: "BudgetSection",
            mode: "edit",
            item: sectionToEdit,
            setItem: setModeItem,
            list: sectionList,
            onSubmitted: onEditSubmitted,
            onCancelled: onModeCancelled
        });
    }

    const onEditSubmitted = (editedSection) => {
        section.name = editedSection.name;
        section.description = editedSection.description;
        section.direction = editedSection.direction;
        section.state = "updated";

        setModeViewModelProps(null);
    };

    const deleteSection = () => {
        var sectionToDelete = {
            id: section.id,
            name: section.name,
            description: section.description,
            direction: section.direction,
        };
        setModeItem(sectionToDelete);
        setModeViewModelProps({
            entity: "BudgetSection",
            mode: "delete",
            item: sectionToDelete,
            onSubmitted: onDeleteSubmitted,
            onCancelled: onModeCancelled
        });
    }

    const onDeleteSubmitted = (sectionToDelete) => {
        section.state = "deleted";
        setModeViewModelProps(null);
    };

    const addCategory = () => {
        var categoryToAdd = {
            id: -1,
            name: "",
            description: "",
            sectionId: section.id,
        };
        setModeItem(categoryToAdd);
        setModeViewModelProps({
            entity: "BudgetCategory",
            mode: "add",
            item: categoryToAdd,
            setItem: setModeItem,
            list: categoryList,
            sections: sectionList,
            onSubmitted: onAddSubmitted,
            onCancelled: onModeCancelled
        });
    };

    const onAddSubmitted = (categoryToAdd) => {
        const minID = categoryList.reduce(
            (min, category) => Number(min) < Number(category.id) ? Number(min) : Number(category.id), 0);
        categoryToAdd.id = minID - 1;
        categoryToAdd.accounts = [];
        categoryToAdd.state = "created";

        section.categories = [...section.categories, categoryToAdd].sort(compareCategories);

        setModeViewModelProps(null);
    };

    return {
        name: section.name,
        categoryViewModels,
        total: formattedTotal,

        showSection,
        editSection,
        deleteSection,

        addCategory,
    }
};

export default BudgetWorksheetSectionViewModel;