
import BankAccount from "models/bank/IBankAccount";

import IBasicDetailsViewModel from "pages/basic/common/viewModels/IBasicDetailsViewModel";

export default interface IBankAccountDetailsViewModel extends IBasicDetailsViewModel {
    account: BankAccount;
    bankName: string;
}
