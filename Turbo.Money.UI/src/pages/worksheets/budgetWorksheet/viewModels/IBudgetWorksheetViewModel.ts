
import IBasicModeViewModel from "pages/basic/common/viewModels/IBasicModeViewModel";

import IBudgetWorksheetSectionViewModel from "./IBudgetWorksheetSectionViewModel";

export default interface IBudgetWorksheetViewModel {
    title: string;
    sectionViewModels: IBudgetWorksheetSectionViewModel[];
    modeViewModel: null | IBasicModeViewModel;
    total: string;
    status: string;

    loadBudgetData: () => Promise<void>;
    saveBudgetData: () => Promise<void>;

    addSection: () => void;
}