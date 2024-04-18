
import IBudgetSection from "models/budget/IBudgetSection";

import IBasicDetailsViewModel from "pages/basic/common/viewModels/IBasicDetailsViewModel";

export default interface IBudgetSectionDetailsViewModel extends IBasicDetailsViewModel {
    section: IBudgetSection;
}
