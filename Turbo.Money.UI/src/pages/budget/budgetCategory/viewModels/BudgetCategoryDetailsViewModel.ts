
import IBudgetCategory from "models/budget/IBudgetCategory";

import CommonDetailsViewModel from "pages/common/viewModels/CommonDetailsViewModel";
import ICommonModeViewModelProps from "pages/common/viewModels/ICommonModeViewModelProps";
import ICommonDetailsViewModel from "pages/common/viewModels/ICommonDetailsViewModel";

export default function BudgetCategoryDetailsViewModel(
    { title, entity, mode, item, parentList, onSubmitted, onCancelled }: ICommonModeViewModelProps
): ICommonDetailsViewModel {

    const category = item as IBudgetCategory;

    const matching = category && parentList && parentList.find(section => section.id === category.sectionId);
    const sectionName = matching ? matching.name :
        category ? `section id = ${category.sectionId}` : "<null>";

    const common = CommonDetailsViewModel({
        title,
        entity,
        mode,
        item,
        onSubmitted,
        onCancelled
    });

    return {
        ...common,
        category,
        sectionName
    } as ICommonDetailsViewModel;
}
