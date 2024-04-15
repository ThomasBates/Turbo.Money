
import IBudgetAccount from "models/budget/IBudgetAccount";
import ICommonItem from "models/common/ICommonItem";

import ICommonEditViewModel from "pages/common/viewModels/ICommonEditViewModel";

export default interface IBudgetAccountEditViewModel extends ICommonEditViewModel {
    account: IBudgetAccount;
    categories: ICommonItem[];
    amountTypes: { value: string; text: string }[];

    isValidName: boolean;
    isValidDescription: boolean;
    isValidCategoryId: boolean;
    isValidAmount: boolean;
    isValidMethod: boolean;
    isValidType: boolean;
}
