import React from "react";

import CommonEditViewModel from "../CommonEditViewModel";

export default (mode, item, setItem, accounts, categories, onSubmitted, onCancelled) => {

    const amountTypes = [
        { value: "min", text: "Minimum" },
        { value: "fix", text: "Fixed" },
        { value: "max", text: "Maximum" },
        { value: "est", text: "Estimate" },
        { value: "avg", text: "Average" }
    ];

    const common = CommonEditViewModel(
        "Budget Account",
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

    const getIsValidCategoryId = () => {
        if (!item.categoryId || item.categoryId <= 0)
            return false;
        if (isNaN(+item.categoryId))
            return false;
        const matching = accounts.find(a => a.number == item.number && a.categoryId == item.categoryId && a.id != item.id);
        if (matching)
            return false;
        return true;
    }

    const isValidName = getIsValidName();
    const isValidDescription = item.description && item.description.length > 0;
    const isValidCategoryId = getIsValidCategoryId();
    const isValidAmount = item.amount && item.amount.length > 0;
    const isValidMethod = item.method && item.method.length > 0;
    const isValidType = amountTypes.map(type => type.value).includes(item.type);

    const canSubmit =
        isValidName &&
        isValidDescription &&
        isValidCategoryId &&
        isValidAmount &&
        isValidMethod &&
        isValidType;

    return {
        ...common,

        categories,
        amountTypes,

        isValidName,
        isValidDescription,
        isValidCategoryId,
        isValidAmount,
        isValidMethod,
        isValidType,
        canSubmit
    }
};
