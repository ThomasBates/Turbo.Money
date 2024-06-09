
import IBudgetPeriod from "models/budget/IBudgetPeriod";

import IBasicModeViewModel from "pages/basic/common/viewModels/IBasicModeViewModel";

export default interface IBudgetWorksheetMainViewModel {
    title: string;
    selectedPeriod: null | IBudgetPeriod;
    modeViewModel: null | IBasicModeViewModel;

    //initializeData: () => void;
    periodDataContext: () => object;
    budgetDataContext: () => object;
//    periodDataContext: object;
//    budgetDataContext: object;
}