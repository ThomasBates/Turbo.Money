import React from "react";

import CommonDetailsViewModel from "../../common/viewModels/CommonDetailsViewModel";

const BudgetSectionDetailsViewModel = ({ mode, item, onSubmitted, onCancelled }) => {

    return CommonDetailsViewModel(
        "Budget Section",
        "BudgetSection",
        mode,
        item,
        onSubmitted,
        onCancelled);
};

export default BudgetSectionDetailsViewModel;