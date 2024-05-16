
import IBudgetPeriod from "models/budget/IBudgetPeriod";

import IBasicModeViewModel from "pages/basic/common/viewModels/IBasicModeViewModel";

import IBudgetWorksheetSectionViewModel from "./IBudgetWorksheetSectionViewModel";

export default interface IBudgetWorksheetBudgetViewModel {
    title: string;
    selectedPeriod: null | IBudgetPeriod,
    sectionViewModels: IBudgetWorksheetSectionViewModel[];
    modeViewModel: null | IBasicModeViewModel;
    total: string;
    status: string;

    //setSelectedPeriod: (period: null | IBudgetPeriod) => void;
    loadBudgetWorksheet: () => Promise<void>;
    saveBudgetWorksheet: () => Promise<void>;

    addSection: () => void;
}