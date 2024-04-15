
import BankAccount from "models/bank/IBankAccount";
import ICommonItem from "models/common/ICommonItem";

import ICommonEditViewModel from "pages/common/viewModels/ICommonEditViewModel";

export default interface IBankAccountEditViewModel extends ICommonEditViewModel {
    account: BankAccount;
    banks: ICommonItem[];

    isValidName: boolean;
    isValidBankId: boolean;
    isValidNumber: boolean;
}
