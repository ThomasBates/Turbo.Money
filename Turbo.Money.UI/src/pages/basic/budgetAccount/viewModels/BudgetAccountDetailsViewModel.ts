
import IModelItem from "common/models/IModelItem";

import IBudgetAccount from "models/budget/IBudgetAccount";

import BasicDetailsViewModel from "pages/basic/common/viewModels/BasicDetailsViewModel";
import IBasicModeViewModelProps from "pages/basic/common/viewModels/IBasicModeViewModelProps";

import IBudgetAccountDetailsViewModel from "./IBudgetAccountDetailsViewModel";

export default function BudgetAccountDetailsViewModel(
    { title, entity, mode, item, parentList, onSubmitted, onCancelled }: IBasicModeViewModelProps
): IBudgetAccountDetailsViewModel{

    const account = item as IBudgetAccount;

    const matching = account && parentList && parentList.find((category: IModelItem) => category.id === account.categoryId);
    const categoryName = matching ? matching.name :
        account ? `category id = ${account.categoryId}` : "<null>";

    const amountTypes: Record<string,string> = {
        "min": "Minimum",
        "fix": "Fixed",
        "max": "Maximum",
        "est": "Estimate",
        "avg": "Average"
    };
    const typeName = account && amountTypes[account.type];

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
        account,
        categoryName,
        typeName,
    };
}
