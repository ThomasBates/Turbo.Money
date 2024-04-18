
import IBudgetSection from "models/budget/IBudgetSection";

import BasicDetailsViewModel from "pages/basic/common/viewModels/BasicDetailsViewModel";
import IBasicModeViewModelProps from "pages/basic/common/viewModels/IBasicModeViewModelProps";

import IBudgetSectionDetailsViewModel from "./IBudgetSectionDetailsViewModel";

export default function BudgetSectionDetailsViewModel(
    { title, entity, mode, item, onSubmitted, onCancelled }: IBasicModeViewModelProps
): IBudgetSectionDetailsViewModel {

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
        section: item as IBudgetSection,
    }
}
