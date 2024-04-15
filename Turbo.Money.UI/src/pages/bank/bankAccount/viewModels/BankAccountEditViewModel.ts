
import IBankAccount from "models/bank/IBankAccount";
import ICommonItem from "models/common/ICommonItem";

import CommonEditViewModel from "pages/common/viewModels/CommonEditViewModel";
import ICommonModeViewModelProps from "pages/common/viewModels/ICommonModeViewModelProps";

import IBankAccountEditViewModel from "./IBankAccountEditViewModel";

export default function BankAccountEditViewModel(
    { title, entity, mode, item, list, parentList, setItem, onSubmitted, onCancelled }: ICommonModeViewModelProps
): IBankAccountEditViewModel {

    const account = item as IBankAccount;

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
            item.name.toUpperCase() == account.name.toUpperCase() &&
            item.id != account.id);
        if (matching)
            return false;
        return true;
    }

    const getIsValidBankId = () => {
        if (!account.bankId)
            return false;
        if (isNaN(+account.bankId))
            return false;
        const matching = list && list.find((item: ICommonItem) =>
            item.number == account.number &&
            item.bankId == account.bankId &&
            item.id != account.id);
        if (matching)
            return false;
        return true;
    }

    const getIsValidNumber = () => {
        if (!account.number || account.number.length == 0)
            return false;
        if (isNaN(+account.number))
            return false;
        const matching = list && list.find((item: ICommonItem) =>
            item.number == account.number &&
            item.bankId == account.bankId &&
            item.id != account.id);
        if (matching)
            return false;
        return true;
    }

    const isValidName = getIsValidName();
    const isValidBankId = getIsValidBankId();
    const isValidNumber = getIsValidNumber();
    const canSubmit = isValidName && isValidBankId && isValidNumber;

    return {
        ...common,

        account,
        banks: parentList || [],

        isValidName,
        isValidBankId,
        isValidNumber,
        canSubmit
    };
}
