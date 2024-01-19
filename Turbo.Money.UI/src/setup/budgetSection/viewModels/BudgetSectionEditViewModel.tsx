import React from "react";

import CommonEditViewModel from "../../common/viewModels/CommonEditViewModel";

const BudgetSectionEditViewModel = ({ mode, item, setItem, list, onSubmitted, onCancelled }) => {

    const common = CommonEditViewModel(
        "Budget Section",
        "BudgetSection",
        mode,
        item,
        setItem,
        onSubmitted,
        onCancelled);

    const getIsValidName = () => {
        if (!item.name || item.name.length == 0)
            return false;
        const matching = list.find(b =>
            b.name.toUpperCase() == item.name.toUpperCase() &&
            b.id != item.id);
        if (matching)
            return false;
        return true;
    }

    const getIsValidDescription = () => {
        if (!item.description)
            return false;
        if (item.description.length == 0)
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
    const isValidDescription = getIsValidDirection();
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

export default BudgetSectionEditViewModel;