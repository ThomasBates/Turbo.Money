import React from "react";

import CommonDetailsViewModel from "../../common/viewModels/CommonDetailsViewModel";

export default ({ mode, item, onSubmitted, onCancelled }) => {

    return CommonDetailsViewModel(
        "Budget Section",
        "BudgetSection",
        mode,
        item,
        onSubmitted,
        onCancelled);
};
