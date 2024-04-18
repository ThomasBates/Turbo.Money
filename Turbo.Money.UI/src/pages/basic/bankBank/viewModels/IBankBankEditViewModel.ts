
import IBankBank from "models/bank/IBankBank";

import IBasicEditViewModel from "pages/basic/common/viewModels/IBasicEditViewModel";

export default interface IBankBankEditViewModel extends IBasicEditViewModel {
    bank: IBankBank;

    isValidName: boolean;
    isValidNumber: boolean;
    isValidBranch: boolean;
}
