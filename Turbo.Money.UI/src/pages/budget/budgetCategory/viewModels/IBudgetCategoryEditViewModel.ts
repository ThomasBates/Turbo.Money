
import IBudgetCategory from "models/budget/IBudgetCategory";
import ICommonItem from "models/common/ICommonItem";

import ICommonEditViewModel from "pages/common/viewModels/ICommonEditViewModel";

export default interface IBudgetCategoryEditViewModel extends ICommonEditViewModel {
    category: IBudgetCategory;
    sections: ICommonItem[];

    isValidName: boolean;
    isValidDescription: boolean;
    isValidSectionId: boolean;
}
