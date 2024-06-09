
import IBudgetPeriod from "models/budget/IBudgetPeriod";

import BasicDetailsViewModel from "pages/basic/common/viewModels/BasicDetailsViewModel";
import IBasicModeViewModelProps from "pages/basic/common/viewModels/IBasicModeViewModelProps";

import IBudgetPeriodDetailsViewModel from "./IBudgetPeriodDetailsViewModel";

export default function BudgetPeriodDetailsViewModel(
    { title, entity, mode, item, onSubmitted, onCancelled }: IBasicModeViewModelProps
): IBudgetPeriodDetailsViewModel {

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
        period: item as IBudgetPeriod,
    }
}
