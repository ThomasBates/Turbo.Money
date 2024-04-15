
import IBudgetSection from "models/budget/IBudgetSection";

import CommonDetailsViewModel from "pages/common/viewModels/CommonDetailsViewModel";
import ICommonModeViewModelProps from "pages/common/viewModels/ICommonModeViewModelProps";
import IBudgetSectionDetailsViewModel from "./IBudgetSectionDetailsViewModel";

export default function BudgetSectionDetailsViewModel(
    { title, entity, mode, item, onSubmitted, onCancelled }: ICommonModeViewModelProps
): IBudgetSectionDetailsViewModel {

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
        section: item as IBudgetSection,
    }
}
