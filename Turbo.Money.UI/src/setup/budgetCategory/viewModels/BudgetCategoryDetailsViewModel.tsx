import React from "react";

import CommonDetailsViewModel from "../../common/viewModels/CommonDetailsViewModel";

const BudgetCategoryDetailsViewModel = ({ mode, item, sections, onSubmitted, onCancelled }) => {

    const matching = item && sections && sections.find(section => section.id === item.sectionId);
    const sectionName = matching ? matching.name :
        item ? `section id = ${item.sectionId}` : "<null>";

    const common = CommonDetailsViewModel(
        "Budget Category",
        "BudgetCategory",
        mode,
        item,
        onSubmitted,
        onCancelled);

    return {
        ...common,
        sectionName
    };
};

export default BudgetCategoryDetailsViewModel;