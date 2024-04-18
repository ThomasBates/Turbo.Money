
import IBudgetAccount from "models/budget/IBudgetAccount";

import IBasicDetailsViewModel from "pages/basic/common/viewModels/IBasicDetailsViewModel";

export default interface IBudgetAccountDetailsViewModel extends IBasicDetailsViewModel {
    account: IBudgetAccount;
    categoryName: string;
    typeName: string;
}
