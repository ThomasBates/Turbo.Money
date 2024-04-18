
import IModelItem from "common/models/IModelItem";

import BankAccount from "models/bank/IBankAccount";

import BasicDetailsViewModel from "pages/basic/common/viewModels/BasicDetailsViewModel";
import IBasicModeViewModelProps from "pages/basic/common/viewModels/IBasicModeViewModelProps";

import IBankAccountDetailsViewModel from "./IBankAccountDetailsViewModel";

export default function BankAccountDetailsViewModel(
    { title, entity, mode, item, parentList, onSubmitted, onCancelled }: IBasicModeViewModelProps
): IBankAccountDetailsViewModel {

    const account = item as BankAccount;

    const matching = account && parentList && parentList.find((item: IModelItem) => item.id === account.bankId);
    const bankName = matching ? matching.name :
        account ? `bank id = ${account.bankId}` : "<null>";

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
        bankName,
    };
}
