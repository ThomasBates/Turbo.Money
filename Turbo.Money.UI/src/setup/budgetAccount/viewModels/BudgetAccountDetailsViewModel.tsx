import React from "react";

import CommonDetailsViewModel from "../../common/viewModels/CommonDetailsViewModel";

const BudgetAccountDetailsViewModel = ({ mode, item, categories, onSubmitted, onCancelled }) => {

    const matching = item && categories && categories.find(category => category.id === item.categoryId);
    const categoryName = matching ? matching.name :
        item ? `category id = ${item.categoryId}` : "<null>";

    const amountTypes = {
        "min": "Minimum",
        "fix": "Fixed",
        "max": "Maximum",
        "est": "Estimate",
        "avg": "Average"
    };
    const typeName = item && amountTypes[item.type];

    const common = CommonDetailsViewModel(
        "Budget Account",
        "BudgetAccount",
        mode,
        item,
        onSubmitted,
        onCancelled);

    return {
        ...common,
        categoryName,
        typeName,
    };
};

export default BudgetAccountDetailsViewModel;