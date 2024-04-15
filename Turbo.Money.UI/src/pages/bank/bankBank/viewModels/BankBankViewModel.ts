
import BankBankDataProvider from "data/bankBank/BankBankDataProvider";

import IBankBank from "models/bank/IBankBank";

import CommonViewModel from "pages/common/viewModels/CommonViewModel";
import ICommonViewModel from "pages/common/viewModels/ICommonViewModel";

import BankDetailsViewModel from "./BankBankDetailsViewModel";
import BankEditViewModel from "./BankBankEditViewModel";

export default function BankViewModel(): ICommonViewModel {
    const initialBankBank: IBankBank = {
        id: 0,
        name: "",
        description: "",
        number: "",
        branch: ""
    };

    return CommonViewModel({
        title: "Banks",
        modeTitle: "Bank",
        entity: "BankBank",
        dataProvider: BankBankDataProvider,
        initialItem: initialBankBank,
        detailsViewModel: BankDetailsViewModel,
        editViewModel: BankEditViewModel
    });
}
