
import IBudgetPeriod from "models/budget/IBudgetPeriod";

import IBasicDetailsViewModel from "pages/basic/common/viewModels/IBasicDetailsViewModel";

export default interface IBudgetPeriodDetailsViewModel extends IBasicDetailsViewModel {
    period: IBudgetPeriod;
}
