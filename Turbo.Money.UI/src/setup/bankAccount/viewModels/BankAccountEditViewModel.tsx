import React from "react";

import CommonEditViewModel from "../../common/viewModels/CommonEditViewModel";

export default (mode, item, setItem, accounts, banks, onSubmitted, onCancelled) => {

    const common = CommonEditViewModel(
        "Bank Account",
        mode,
        item,
        setItem,
        onSubmitted,
        onCancelled);

    const getIsValidName = () => {
        if (!item.name || item.name.length == 0)
            return false;
        const matching = accounts.find(b => b.name.toUpperCase() == item.name.toUpperCase() && b.id != item.id);
        if (matching)
            return false;
        return true;
    }

    const getIsValidBankId = () => {
        if (!item.bankId || item.bankId <= 0)
            return false;
        if (isNaN(+item.bankId))
            return false;
        const matching = accounts.find(a => a.number == item.number && a.bankId == item.bankId && a.id != item.id);
        if (matching)
            return false;
        return true;
    }

    const getIsValidNumber = () => {
        if (!item.number || item.number.length == 0)
            return false;
        if (isNaN(+item.number))
            return false;
        const matching = accounts.find(a => a.number == item.number && a.bankId == item.bankId && a.id != item.id);
        if (matching)
            return false;
        return true;
    }

    const isValidName = getIsValidName();
    const isValidBankId = getIsValidBankId();
    const isValidNumber = getIsValidNumber();
    const canSubmit = isValidName && isValidBankId && isValidNumber;

    return {
        ...common,

        banks,

        isValidName,
        isValidBankId,
        isValidNumber,
        canSubmit
    }
};
