
import IBudgetSection from "models/budget/IBudgetSection";

import ICommonDetailsViewModel from "pages/common/viewModels/ICommonDetailsViewModel";

export default interface IBudgetSectionDetailsViewModel extends ICommonDetailsViewModel {
    section: IBudgetSection;
}
