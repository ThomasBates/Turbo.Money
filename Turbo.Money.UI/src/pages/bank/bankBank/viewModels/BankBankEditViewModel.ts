
import IBankBank from "models/bank/IBankBank";
import ICommonItem from "models/common/ICommonItem";

import CommonEditViewModel from "pages/common/viewModels/CommonEditViewModel";
import ICommonModeViewModelProps from "pages/common/viewModels/ICommonModeViewModelProps";

import IBankBankEditViewModel from "./IBankBankEditViewModel";

export default function BankEditViewModel(
    { title, entity, mode, item, list, setItem, onSubmitted, onCancelled }: ICommonModeViewModelProps
): IBankBankEditViewModel{

    const bank = item as IBankBank;

    const common = CommonEditViewModel({
        title,
        entity,
        mode,
        item,
        setItem,
        onSubmitted,
        onCancelled
    });

    const getIsValidName = (): boolean => {
        if (!bank.name || bank.name.length == 0)
            return false;
        const matching = list && list.find((item: ICommonItem) =>
            item.name.toUpperCase() == bank.name.toUpperCase() &&
            item.id != bank.id);
        if (matching)
            return false;
        return true;
    }

    const getIsValidNumber = (): boolean => {
        //if (!bank.number || bank.number.length != 3)
        //    return false;
        //if (isNaN(+bank.number))
        //    return false;
        const matching = list && list.find((item: ICommonItem) =>
            item.number == bank.number &&
            item.branch == bank.branch &&
            item.id != bank.id);
        if (matching)
            return false;
        return true;
    }

    const getIsValidBranch = (): boolean => {
        //if (!bank.branch || bank.branch.length != 5)
        //    return false;
        //if (isNaN(+bank.branch))
        //    return false;
        const matching = list && list.find((item: ICommonItem) =>
            item.number == bank.number &&
            item.branch == bank.branch &&
            item.id != bank.id);
        if (matching)
            return false;
        return true;
    }

    const isValidName: boolean = getIsValidName();
    const isValidNumber: boolean = getIsValidNumber();
    const isValidBranch: boolean = getIsValidBranch();
    const canSubmit: boolean = isValidName && isValidNumber && isValidBranch;

    return {
        ...common,

        bank,

        isValidName,
        isValidNumber,
        isValidBranch,
        canSubmit
    };
}
