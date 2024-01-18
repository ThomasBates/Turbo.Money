import React from "react";

import CommonDetailsViewModel from "../../common/viewModels/CommonDetailsViewModel";

export default ({ mode, item, onSubmitted, onCancelled }) => {

    return CommonDetailsViewModel(
        "Bank",
        "Bank",
        mode,
        item,
        onSubmitted,
        onCancelled);
};
