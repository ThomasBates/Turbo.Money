import React from "react";

import BudgetWorksheetCategoryViewModel from "./BudgetWorksheetCategoryViewModel";

export default (section) => {

    const categoryViewModels = section.categories &&
        section.categories.map(category => BudgetWorksheetCategoryViewModel(category));

    let total = section.categories.reduce(
        (sum, category) => Number(sum) + (
            category.accounts.reduce(
                (sum, account) => Number(sum) + Number(account.amount), 0)
        ), 0);

    total = total.toFixed(2);

    return {
        name: section.name,
        categoryViewModels,
        total
    }
};
