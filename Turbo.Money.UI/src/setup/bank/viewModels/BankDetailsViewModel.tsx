import React from "react";

import CommonDetailsViewModel from "../../common/viewModels/CommonDetailsViewModel";

export default (mode, item?, onSubmitted?, onCancelled?) => {

    return CommonDetailsViewModel(
        mode,
        "Bank",
        item,
        onSubmitted,
        onCancelled);
};
