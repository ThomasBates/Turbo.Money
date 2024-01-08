import React from "react";

import CommonEditViewModel from "../CommonEditViewModel";

export default (mode, item, setItem, categories, onSubmitted, onCancelled) => {

    const common = CommonEditViewModel(
        "Budget Category",
        mode,
        item,
        setItem,
        onSubmitted,
        onCancelled);

    const getIsValidName = () => {
        if (!item.name || item.name.length == 0)
            return false;
        const matching = categories.find(b =>
            b.name.toUpperCase() == item.name.toUpperCase() &&
            b.id != item.id);
        if (matching)
            return false;
        return true;
    }

    const getIsValidDirection = () => {
        if (!item.direction)
            return false;
        if (item.direction == "in" || item.direction == "out")
            return true;
        return false;
    }

    const isValidName = getIsValidName();
    const isValidDescription = true;
    const isValidDirection = getIsValidDirection();
    const canSubmit = isValidName && isValidDescription && isValidDirection;

    return {
        ...common,

        isValidName,
        isValidDescription,
        isValidDirection,
        canSubmit
    }
};
