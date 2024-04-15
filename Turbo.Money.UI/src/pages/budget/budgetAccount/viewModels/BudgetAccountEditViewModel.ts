
import IBudgetAccount from "models/budget/IBudgetAccount";
import ICommonItem from "models/common/ICommonItem";

import CommonEditViewModel from "pages/common/viewModels/CommonEditViewModel";
import ICommonModeViewModelProps from "pages/common/viewModels/ICommonModeViewModelProps";

import IBudgetAccountEditViewModel from "./IBudgetAccountEditViewModel";


export default function BudgetAccountEditViewModel(
    { title, entity, mode, item, list, parentList, setItem, onSubmitted, onCancelled }: ICommonModeViewModelProps
): IBudgetAccountEditViewModel {

    const account = item as IBudgetAccount;

    const amountTypes = [
        { value: "min", text: "Minimum" },
        { value: "fix", text: "Fixed" },
        { value: "max", text: "Maximum" },
        { value: "est", text: "Estimate" },
        { value: "avg", text: "Average" }
    ];

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
        if (!account.name || account.name.length == 0)
            return false;
        const matching = list && list.find((item: ICommonItem) =>
            item.name.toUpperCase() == item.name.toUpperCase() &&
            item.id != item.id);
        if (matching)
            return false;
        return true;
    }

    const getIsValidCategoryId = () => {
        if (!account.categoryId)
            return false;
        if (isNaN(+account.categoryId))
            return false;
        if (!parentList || !parentList.find((category: ICommonItem) => category.id == account.categoryId))
            return false;
        return true;
    }

    const isValidName: boolean = getIsValidName();
    const isValidDescription: boolean = !!account.description && account.description.length > 0;
    const isValidCategoryId: boolean = getIsValidCategoryId();
    const isValidAmount: boolean = !!account.amount && account.amount.length > 0;
    const isValidMethod: boolean = !!account.method && account.method.length > 0;
    const isValidType: boolean = amountTypes.map(type => type.value).includes(account.type);

    const canSubmit =
        isValidName &&
        isValidDescription &&
        isValidCategoryId &&
        isValidAmount &&
        isValidMethod &&
        isValidType;

    return {
        ...common,

        account,

        categories: parentList || [],
        amountTypes,

        isValidName,
        isValidDescription,
        isValidCategoryId,
        isValidAmount,
        isValidMethod,
        isValidType,
        canSubmit
    }
}
