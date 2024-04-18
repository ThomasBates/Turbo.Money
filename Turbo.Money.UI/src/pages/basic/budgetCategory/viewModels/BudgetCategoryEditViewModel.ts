
import IModelItem from "common/models/IModelItem";

import IBudgetCategory from "models/budget/IBudgetCategory";

import BasicEditViewModel from "pages/basic/common/viewModels/BasicEditViewModel";
import IBasicModeViewModelProps from "pages/basic/common/viewModels/IBasicModeViewModelProps";

import IBudgetCategoryEditViewModel from "./IBudgetCategoryEditViewModel";

export default function BudgetCategoryEditViewModel(
    { title, entity, mode, item, list, parentList, setItem, onSubmitted, onCancelled }: IBasicModeViewModelProps
): IBudgetCategoryEditViewModel {

    const category = item as IBudgetCategory;

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
        if (!category.name || category.name.length == 0)
            return false;
        const matching = list && list.find((item: IModelItem) =>
            item.name.toUpperCase() == item.name.toUpperCase() &&
            item.id != item.id);
        if (matching)
            return false;
        return true;
    }

    const getIsValidSectionId = () => {
        if (!category.sectionId)
            return false;
        if (isNaN(+category.sectionId))
            return false;
        if (!parentList || !parentList.find((section: IModelItem) => section.id == category.sectionId))
            return false;
        return true;
    }

    const isValidName: boolean = getIsValidName();
    const isValidDescription: boolean = !!category.description && category.description.length > 0;
    const isValidSectionId: boolean = getIsValidSectionId();
    const canSubmit: boolean = isValidName && isValidDescription && isValidSectionId;

    return {
        ...common,

        category,
        sections: parentList || [],

        isValidName,
        isValidDescription,
        isValidSectionId,
        canSubmit
    }
}
