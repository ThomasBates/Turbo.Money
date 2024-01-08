import React from "react";

import CommonDetailsViewModel from "../../common/viewModels/CommonDetailsViewModel";

export default (mode, item?, onSubmitted?, onCancelled?) => {

    return CommonDetailsViewModel(
        mode,
        "Budget Category",
        item,
        onSubmitted,
        onCancelled);
};
