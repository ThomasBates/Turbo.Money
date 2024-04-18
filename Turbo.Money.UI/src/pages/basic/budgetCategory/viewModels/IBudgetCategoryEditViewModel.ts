
import IModelItem from "common/models/IModelItem";

import IBudgetCategory from "models/budget/IBudgetCategory";

import IBasicEditViewModel from "pages/basic/common/viewModels/IBasicEditViewModel";

export default interface IBudgetCategoryEditViewModel extends IBasicEditViewModel {
    category: IBudgetCategory;
    sections: IModelItem[];

    isValidName: boolean;
    isValidDescription: boolean;
    isValidSectionId: boolean;
}
