
import IModelItem from "common/models/IModelItem";

import IBudgetAccount from "models/budget/IBudgetAccount";

import IBasicEditViewModel from "pages/basic/common/viewModels/IBasicEditViewModel";

export default interface IBudgetAccountEditViewModel extends IBasicEditViewModel {
    account: IBudgetAccount;
    categories: IModelItem[];
    amountTypes: { value: string; text: string }[];

    isValidName: boolean;
    isValidDescription: boolean;
    isValidCategoryId: boolean;
    isValidAmount: boolean;
    isValidMethod: boolean;
    isValidType: boolean;
}
