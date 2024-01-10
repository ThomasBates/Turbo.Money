import React from "react";

import BudgetWorksheetCategoryViewModel from "./BudgetWorksheetCategoryViewModel";

export default (section) => {

    const categoryViewModels = section.categories &&
        section.categories.map(category => BudgetWorksheetCategoryViewModel(category));

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

    return {
        name: section.name,
        categoryViewModels,
        total: formattedTotal
    }
};
