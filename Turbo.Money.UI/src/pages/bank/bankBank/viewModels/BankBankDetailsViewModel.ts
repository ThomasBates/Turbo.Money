
import IBankBank from "models/bank/IBankBank";

import CommonDetailsViewModel from "pages/common/viewModels/CommonDetailsViewModel";
import ICommonModeViewModelProps from "pages/common/viewModels/ICommonModeViewModelProps";

import IBankBankDetailsViewModel from "./IBankBankDetailsViewModel";

export default function BankDetailsViewModel(
    { title, entity, mode, item, onSubmitted, onCancelled }: ICommonModeViewModelProps
): IBankBankDetailsViewModel {

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
        bank: item as IBankBank,
    }
}
