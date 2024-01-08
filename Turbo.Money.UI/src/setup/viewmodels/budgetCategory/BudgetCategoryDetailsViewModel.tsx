import React from "react";

import CommonDetailsViewModel from "../CommonDetailsViewModel";

export default (mode, item?, onSubmitted?, onCancelled?) => {

    return CommonDetailsViewModel(
        mode,
        "Budget Category",
        item,
        onSubmitted,
        onCancelled);
};
