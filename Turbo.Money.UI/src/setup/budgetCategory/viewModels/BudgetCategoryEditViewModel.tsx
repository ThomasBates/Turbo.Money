import React from "react";

import CommonEditViewModel from "../../common/viewModels/CommonEditViewModel";

const BudgetCategoryEditViewModel = ({ mode, item, setItem, list, sections, onSubmitted, onCancelled }) => {

    const common = CommonEditViewModel(
        "Budget Category",
        "BudgetCategory",
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

    const getIsValidSectionId = () => {
        if (isNaN(+item.sectionId))
            return false;
        if (!sections.find(c => c.id == item.sectionId))
            return false;
        return true;
    }

    const isValidName = getIsValidName();
    const isValidDescription = item.description && item.description.length > 0;
    const isValidSectionId = getIsValidSectionId();
    const canSubmit = isValidName && isValidDescription && isValidSectionId;

    return {
        ...common,

        sections,

        isValidName,
        isValidDescription,
        isValidSectionId,
        canSubmit
    }
};

export default BudgetCategoryEditViewModel;