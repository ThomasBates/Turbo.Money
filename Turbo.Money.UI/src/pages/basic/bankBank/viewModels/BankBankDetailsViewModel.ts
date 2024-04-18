
import IBankBank from "models/bank/IBankBank";

import BasicDetailsViewModel from "pages/basic/common/viewModels/BasicDetailsViewModel";
import IBasicModeViewModelProps from "pages/basic/common/viewModels/IBasicModeViewModelProps";

import IBankBankDetailsViewModel from "./IBankBankDetailsViewModel";

export default function BankDetailsViewModel(
    { title, entity, mode, item, onSubmitted, onCancelled }: IBasicModeViewModelProps
): IBankBankDetailsViewModel {

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
        bank: item as IBankBank,
    }
}
