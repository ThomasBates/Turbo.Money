
import IBankBank from "models/bank/IBankBank";

import IBasicDetailsViewModel from "pages/basic/common/viewModels/IBasicDetailsViewModel";

export default interface IBankBankDetailsViewModel extends IBasicDetailsViewModel {
    bank: IBankBank;
}
