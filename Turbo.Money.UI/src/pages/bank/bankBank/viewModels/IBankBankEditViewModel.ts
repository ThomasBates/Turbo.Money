
import IBankBank from "models/bank/IBankBank";

import ICommonEditViewModel from "pages/common/viewModels/ICommonEditViewModel";

export default interface IBankBankEditViewModel extends ICommonEditViewModel {
    bank: IBankBank;

    isValidName: boolean;
    isValidNumber: boolean;
    isValidBranch: boolean;
}
