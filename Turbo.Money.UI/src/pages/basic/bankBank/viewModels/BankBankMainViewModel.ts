
import IBasicDataProvider from "data/interfaces/basic/IBasicDataProvider";

import IBankBank from "models/bank/IBankBank";

import BasicMainViewModel from "pages/basic/common/viewModels/BasicMainViewModel";
import IBasicMainViewModel from "pages/basic/common/viewModels/IBasicMainViewModel";

import ILoggerService from "services/logger/ILoggerService";
import IErrorService from "services/errors/IErrorService";

import BankDetailsViewModel from "./BankBankDetailsViewModel";
import BankEditViewModel from "./BankBankEditViewModel";

export default function BankBankMainViewModel(
    logger: ILoggerService,
    errorService: IErrorService,
    bankBankDataProvider: IBasicDataProvider<IBankBank>
): IBasicMainViewModel {

    const initialBankBank: IBankBank = {
        id: 0,
        name: "",
        description: "",
        number: "",
        branch: ""
    };

    return BasicMainViewModel(
        logger,
        errorService,
        bankBankDataProvider,

        "Banks",
        "Bank",
        "BankBank",

        initialBankBank,
        BankDetailsViewModel,
        BankEditViewModel
    );
}
