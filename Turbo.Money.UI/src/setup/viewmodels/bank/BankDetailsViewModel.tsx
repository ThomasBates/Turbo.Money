import React from "react";

import CommonDetailsViewModel from "../CommonDetailsViewModel";

export default (mode, item?, onSubmitted?, onCancelled?) => {

    return CommonDetailsViewModel(
        mode,
        "Bank",
        item,
        onSubmitted,
        onCancelled);
};
