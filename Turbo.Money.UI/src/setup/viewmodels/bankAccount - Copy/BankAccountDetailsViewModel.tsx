import React from "react";

import BankAccountDataService from "../../../services/BankAccountDataService";

const BankAccountDetailsViewModel = (mode, account?, banks?, onSubmitted?, onCancelled?) => {

    const title = mode === "delete" ? "Delete Bank Account:" : "Bank Account Details:";
    const showDetails = (account && account.id);
    const showButtons = (mode === "delete");

    const matching = account && banks && banks.find(b => b.id === account.bankId);
    const bankName = matching ? matching.name :
        account ? `bank id = ${account.bankId}` : "<null>";

    const deleteAccount = () => {
        BankAccountDataService.remove(account.id)
            .then(response => {
                console.log("deleteAccount: ", response.data);
                onSubmitted();
            })
            .catch(e => {
                console.log(e);
            });
    };

    const submit = () => {
        if (mode === "delete")
            deleteAccount();
    }

    const cancel = () => {
        onCancelled();
    };

    return {
        mode,
        title,
        account,
        bankName,
        showDetails,
        showButtons,

        submit,
        cancel
    };
};

export default BankAccountDetailsViewModel;