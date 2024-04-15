
import IBankBank from "models/bank/IBankBank";

import ICommonDetailsViewModel from "pages/common/viewModels/ICommonDetailsViewModel";

export default interface IBankBankDetailsViewModel extends ICommonDetailsViewModel {
    bank: IBankBank;
}
