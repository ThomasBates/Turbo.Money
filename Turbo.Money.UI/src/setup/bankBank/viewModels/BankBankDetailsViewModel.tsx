import React from "react";

import CommonDetailsViewModel from "../../common/viewModels/CommonDetailsViewModel";

const BankDetailsViewModel = ({ mode, item, onSubmitted, onCancelled }) => {

    return CommonDetailsViewModel(
        "Bank",
        "Bank",
        mode,
        item,
        onSubmitted,
        onCancelled);
};

export default BankDetailsViewModel;