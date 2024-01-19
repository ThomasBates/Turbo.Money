import React from "react";

import CommonDetailsViewModel from "../../common/viewModels/CommonDetailsViewModel";

const BankAccountDetailsViewModel = ({ mode, item, banks, onSubmitted, onCancelled }) => {

    const matching = item && banks && banks.find(b => b.id === item.bankId);
    const bankName = matching ? matching.name :
        item ? `bank id = ${item.bankId}` : "<null>";

    const common = CommonDetailsViewModel(
        "Bank Account",
        "BankAccount",
        mode,
        item,
        onSubmitted,
        onCancelled);

    return {
        ...common,
        bankName,
    };
};

export default BankAccountDetailsViewModel;