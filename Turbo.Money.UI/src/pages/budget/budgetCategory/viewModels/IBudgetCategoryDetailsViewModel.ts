
import IBudgetCategory from "models/budget/IBudgetCategory";

import ICommonDetailsViewModel from "pages/common/viewModels/ICommonDetailsViewModel";

export default interface IBudgetCategoryDetailsViewModel extends ICommonDetailsViewModel {
    category: IBudgetCategory;
    sectionName: string;
}
