
import IBasicDataProvider from "data/interfaces/basic/IBasicDataProvider";

import IBankBank from "models/bank/IBankBank";

import BasicMainViewModel from "pages/basic/common/viewModels/BasicMainViewModel";
import IBasicMainViewModel from "pages/basic/common/viewModels/IBasicMainViewModel";

import BankDetailsViewModel from "./BankBankDetailsViewModel";
import BankEditViewModel from "./BankBankEditViewModel";

export default function BankBankMainViewModel(
    bankBankDataProvider: IBasicDataProvider<IBankBank>
): IBasicMainViewModel {

    const initialBankBank: IBankBank = {
        id: 0,
        name: "",
        description: "",
        number: "",
        branch: ""
    };

    return BasicMainViewModel({
        title: "Banks",
        modeTitle: "Bank",
        entity: "BankBank",
        dataProvider: bankBankDataProvider,
        initialItem: initialBankBank,
        detailsViewModel: BankDetailsViewModel,
        editViewModel: BankEditViewModel
    });
}
