import React from "react";

import BudgetWorksheetAccountViewModel from "./BudgetWorksheetAccountViewModel";

export default (category) => {

    const accountViewModels = category.accounts &&
        category.accounts.map(account => BudgetWorksheetAccountViewModel(account));

    let totalValue = category.accounts.reduce(
        (sum, account) => Number(sum) + Number(account.amount), 0);

    const localeFormat = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });

    const formattedTotal = localeFormat.format(totalValue);

    return {
        name: category.name,
        accountViewModels,
        showTotal: false,
        total: formattedTotal
    }
};
