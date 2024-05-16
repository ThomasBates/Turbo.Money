
import IModelItem from "common/models/IModelItem";

import IBudgetAccount from "models/budget/IBudgetAccount";

import BasicEditViewModel from "pages/basic/common/viewModels/BasicEditViewModel";
import IBasicModeViewModelProps from "pages/basic/common/viewModels/IBasicModeViewModelProps";

import IBudgetAccountEditViewModel from "./IBudgetAccountEditViewModel";
import { BudgetAccountType } from "../../../../models/budget/BudgetAccountType";


export default function BudgetAccountEditViewModel(
    { title, entity, mode, item, list, parentList, setItem, onSubmitted, onCancelled }: IBasicModeViewModelProps
): IBudgetAccountEditViewModel {

    const account = item as IBudgetAccount;

    const amountTypes = [
        { value: BudgetAccountType.minimum, text: "Minimum" },
        { value: BudgetAccountType.fixed, text: "Fixed" },
        { value: BudgetAccountType.maximum, text: "Maximum" },
        { value: BudgetAccountType.estimate, text: "Estimate" },
        { value: BudgetAccountType.average, text: "Average" }
    ];

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
        if (!account.name || account.name.length == 0)
            return false;
        const matching = list && list.find((item: IModelItem) =>
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
        if (!parentList || !parentList.find((category: IModelItem) => category.id == account.categoryId))
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
