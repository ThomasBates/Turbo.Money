import React from "react";

import BudgetWorksheetAccountViewModel from "./BudgetWorksheetAccountViewModel";

export default (category) => {

    const accountViewModels = category.accounts &&
        category.accounts.map(account => BudgetWorksheetAccountViewModel(account));

    let total = category.accounts.reduce(
        (sum, account) => Number(sum) + Number(account.amount), 0);

    total = total.toFixed(2);

    return {
        name: category.name,
        accountViewModels,
        showTotal: false,
        total
    }
};
