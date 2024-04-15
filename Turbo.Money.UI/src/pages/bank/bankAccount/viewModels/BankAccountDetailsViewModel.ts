
import BankAccount from "models/bank/IBankAccount";
import ICommonItem from "models/common/ICommonItem";

import CommonDetailsViewModel from "pages/common/viewModels/CommonDetailsViewModel";
import ICommonModeViewModelProps from "pages/common/viewModels/ICommonModeViewModelProps";

import IBankAccountDetailsViewModel from "./IBankAccountDetailsViewModel";

export default function BankAccountDetailsViewModel(
    { title, entity, mode, item, parentList, onSubmitted, onCancelled }: ICommonModeViewModelProps
): IBankAccountDetailsViewModel {

    const account = item as BankAccount;

    const matching = account && parentList && parentList.find((item: ICommonItem) => item.id === account.bankId);
    const bankName = matching ? matching.name :
        account ? `bank id = ${account.bankId}` : "<null>";

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
        bankName,
    };
}
