
import BankAccount from "models/bank/IBankAccount";

import ICommonDetailsViewModel from "pages/common/viewModels/ICommonDetailsViewModel";

export default interface IBankAccountDetailsViewModel extends ICommonDetailsViewModel {
    account: BankAccount;
    bankName: string;
}
