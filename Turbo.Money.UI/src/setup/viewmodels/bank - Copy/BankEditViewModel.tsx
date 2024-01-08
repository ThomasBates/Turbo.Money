import React from "react";

import BankDataService from "../../services/BankDataService";

const BankEditViewModel = (mode, bank, setBank, banks, onSubmitted, onCancelled) => {
    const title = mode === "edit" ? "Edit Bank:" : "Add Bank:";

    const setProperty = (name, value) => {
        setBank({ ...bank, [name]: value });
    };

    const createBank = () => {
        BankDataService.create(bank)
            .then(response => {
                console.log("createBank: ", response.data);
                onSubmitted(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const updateBank = () => {
        BankDataService.update(bank.id, bank)
            .then(response => {
                console.log("updateBank: ", response.data);
                onSubmitted(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const submit = () => {
        if (mode === "edit")
            updateBank();
        else
            createBank();
    }

    const cancel = () => {
        onCancelled();
    };

    const getIsValidName = () => {
        if (!bank.name || bank.name.length == 0)
            return false;
        const matching = banks.find(b => b.name.toUpperCase() == bank.name.toUpperCase() && b.id != bank.id);
        if (matching)
            return false;
        return true;
    }

    const getIsValidNumber = () => {
        if (!bank.number || bank.number.length != 3)
            return false;
        if (isNaN(+bank.number))
            return false;
        const matching = banks.find(b => b.number == bank.number && b.transit == bank.transit && b.id != bank.id);
        if (matching)
            return false;
        return true;
    }

    const getIsValidTransit = () => {
        if (!bank.transit || bank.transit.length != 5)
            return false;
        if (isNaN(+bank.transit))
            return false;
        const matching = banks.find(b => b.number == bank.number && b.transit == bank.transit && b.id != bank.id);
        if (matching)
            return false;
        return true;
    }

    const isValidName = getIsValidName();
    const isValidNumber = getIsValidNumber();
    const isValidTransit = getIsValidTransit();
    const canSubmit = isValidName && isValidNumber && isValidTransit;

    return {
        mode,
        title,
        bank,

        isValidName,
        isValidNumber,
        isValidTransit,
        canSubmit,

        setProperty,
        submit,
        cancel
    }
};

export default BankEditViewModel; 