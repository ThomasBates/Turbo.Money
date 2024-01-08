import React from "react";

import BankAccountDataService from "../../../services/BankAccountDataService";

const BankAccountEditViewModel = (mode, account, setAccount, accounts, banks, onSubmitted, onCancelled) => {
    const title = mode === "edit" ? "Edit Bank Account:" : "Add Bank Account:";

    const setProperty = (name, value) => {
        setAccount({ ...account, [name]: value });
    };

    const createAccount = () => {
        BankAccountDataService.create(account)
            .then(response => {
                console.log("createAccount: ", response.data);
                onSubmitted(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const updateAccount = () => {
        BankAccountDataService.update(account.id, account)
            .then(response => {
                console.log("updateAccount: ", response.data);
                onSubmitted(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const submit = () => {
        if (mode === "edit")
            updateAccount();
        else
            createAccount();
    }

    const cancel = () => {
        onCancelled();
    };

    const getIsValidName = () => {
        if (!account.name || account.name.length == 0)
            return false;
        const matching = accounts.find(b => b.name.toUpperCase() == account.name.toUpperCase() && b.id != account.id);
        if (matching)
            return false;
        return true;
    }

    const getIsValidBankId = () => {
        if (!account.bankId || account.bankId <= 0)
            return false;
        if (isNaN(+account.bankId))
            return false;
        const matching = accounts.find(a => a.number == account.number && a.bankId == account.bankId && a.id != account.id);
        if (matching)
            return false;
        return true;
    }

    const getIsValidNumber = () => {
        if (!account.number || account.number.length == 0)
            return false;
        if (isNaN(+account.number))
            return false;
        const matching = accounts.find(a => a.number == account.number && a.bankId == account.bankId && a.id != account.id);
        if (matching)
            return false;
        return true;
    }

    const isValidName = getIsValidName();
    const isValidBankId = getIsValidBankId();
    const isValidNumber = getIsValidNumber();
    const canSubmit = isValidName && isValidBankId && isValidNumber;

    return {
        mode,
        title,
        banks,
        account,

        isValidName,
        isValidBankId,
        isValidNumber,
        canSubmit,

        setProperty,
        submit,
        cancel
    }
};

export default BankAccountEditViewModel;