
import IBudgetCategory from "models/budget/IBudgetCategory";

import IBasicDetailsViewModel from "pages/basic/common/viewModels/IBasicDetailsViewModel";

export default interface IBudgetCategoryDetailsViewModel extends IBasicDetailsViewModel {
    category: IBudgetCategory;
    sectionName: string;
}
