
import IModelItem from "common/models/IModelItem";

import IBudgetSection from "models/budget/IBudgetSection";

import BasicEditViewModel from "pages/basic/common/viewModels/BasicEditViewModel";
import IBasicModeViewModelProps from "pages/basic/common/viewModels/IBasicModeViewModelProps";

import IBudgetSectionEditViewModel from "./IBudgetSectionEditViewModel";

export default function BudgetSectionEditViewModel(
    { title, entity, mode, item, list, setItem, onSubmitted, onCancelled }: IBasicModeViewModelProps
): IBudgetSectionEditViewModel {

    const section = item as IBudgetSection;

    const common = BasicEditViewModel({
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
        const matching = list && list.find((item: IModelItem) =>
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
