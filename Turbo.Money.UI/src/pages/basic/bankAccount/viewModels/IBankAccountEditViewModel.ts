
import IModelItem from "common/models/IModelItem";

import BankAccount from "models/bank/IBankAccount";

import IBasicEditViewModel from "pages/basic/common/viewModels/IBasicEditViewModel";

export default interface IBankAccountEditViewModel extends IBasicEditViewModel {
    account: BankAccount;
    banks: IModelItem[];

    isValidName: boolean;
    isValidBankId: boolean;
    isValidNumber: boolean;
}
