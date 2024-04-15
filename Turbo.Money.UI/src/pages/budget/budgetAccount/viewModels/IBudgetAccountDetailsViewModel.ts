
import IBudgetAccount from "models/budget/IBudgetAccount";

import ICommonDetailsViewModel from "pages/common/viewModels/ICommonDetailsViewModel";

export default interface IBudgetAccountDetailsViewModel extends ICommonDetailsViewModel {
    account: IBudgetAccount;
    categoryName: string;
    typeName: string;
}
