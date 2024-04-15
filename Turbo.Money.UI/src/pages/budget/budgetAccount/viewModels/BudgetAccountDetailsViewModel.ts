
import IBudgetAccount from "models/budget/IBudgetAccount";
import ICommonItem from "models/common/ICommonItem";

import CommonDetailsViewModel from "pages/common/viewModels/CommonDetailsViewModel";
import ICommonModeViewModelProps from "pages/common/viewModels/ICommonModeViewModelProps";

import IBudgetAccountDetailsViewModel from "./IBudgetAccountDetailsViewModel";

export default function BudgetAccountDetailsViewModel(
    { title, entity, mode, item, parentList, onSubmitted, onCancelled }: ICommonModeViewModelProps
): IBudgetAccountDetailsViewModel{

    const account = item as IBudgetAccount;

    const matching = account && parentList && parentList.find((category: ICommonItem) => category.id === account.categoryId);
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
        account,
        categoryName,
        typeName,
    };
}
