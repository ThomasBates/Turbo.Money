
import IBudgetSection from "models/budget/IBudgetSection";
import ICommonItem from "models/common/ICommonItem";

import CommonEditViewModel from "pages/common/viewModels/CommonEditViewModel";
import ICommonModeViewModelProps from "pages/common/viewModels/ICommonModeViewModelProps";

import IBudgetSectionEditViewModel from "./IBudgetSectionEditViewModel";

export default function BudgetSectionEditViewModel(
    { title, entity, mode, item, list, setItem, onSubmitted, onCancelled }: ICommonModeViewModelProps
): IBudgetSectionEditViewModel {

    const section = item as IBudgetSection;

    const common = CommonEditViewModel({
        title,
        entity,
        mode,
        item,
        setItem,
        onSubmitted,
        onCancelled
    });

    const getIsValidName = () => {
        if (!section.name || section.name.length == 0)
            return false;
        const matching = list && list.find((item: ICommonItem) =>
            item.name.toUpperCase() == section.name.toUpperCase() &&
            item.id != section.id);
        if (matching)
            return false;
        return true;
    }

    const getIsValidDescription = () => {
        if (!section.description)
            return false;
        if (section.description.length == 0)
            return false;
        return true;
    }

    const getIsValidDirection = () => {
        if (!section.direction)
            return false;
        if (section.direction == "in" || section.direction == "out")
            return true;
        return false;
    }

    const isValidName = getIsValidName();
    const isValidDescription = getIsValidDescription();
    const isValidDirection = getIsValidDirection();
    const canSubmit = isValidName && isValidDescription && isValidDirection;

    return {
        ...common,

        section,

        isValidName,
        isValidDescription,
        isValidDirection,
        canSubmit
    };
}
