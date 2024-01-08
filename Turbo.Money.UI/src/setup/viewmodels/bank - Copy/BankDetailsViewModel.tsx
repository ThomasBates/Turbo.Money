import React from "react";

import BankDataService from "../../services/BankDataService";

const BankDetailsViewModel = (mode, bank?, onSubmitted?, onCancelled?) => {

    const title = mode === "delete" ? "Delete Bank:" : "Bank Details:";
    const showDetails = (bank && bank.id);
    const showButtons = (mode === "delete");

    const deleteBank = () => {
        BankDataService.remove(bank.id)
            .then(response => {
                console.log("deleteBank: ", response.data);
                onSubmitted();
            })
            .catch(e => {
                console.log(e);
            });
    };

    const submit = () => {
        if (mode === "delete")
            deleteBank();
    }

    const cancel = () => {
        onCancelled();
    };

    return {
        mode,
        title,
        bank,
        showDetails,
        showButtons,

        submit,
        cancel
    };
};

export default BankDetailsViewModel;