
import IBudgetCategory from "models/budget/IBudgetCategory";

import BasicDetailsViewModel from "pages/basic/common/viewModels/BasicDetailsViewModel";
import IBasicModeViewModelProps from "pages/basic/common/viewModels/IBasicModeViewModelProps";
import IBasicDetailsViewModel from "pages/basic/common/viewModels/IBasicDetailsViewModel";

export default function BudgetCategoryDetailsViewModel(
    { title, entity, mode, item, parentList, onSubmitted, onCancelled }: IBasicModeViewModelProps
): IBasicDetailsViewModel {

    const category = item as IBudgetCategory;

    const matching = category && parentList && parentList.find(section => section.id === category.sectionId);
    const sectionName = matching ? matching.name :
        category ? `section id = ${category.sectionId}` : "<null>";

    const common = BasicDetailsViewModel({
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
    } as IBasicDetailsViewModel;
}
