
import ICommonModeViewModel from "pages/common/viewModels/ICommonModeViewModel";

import IBudgetWorksheetSectionViewModel from "./IBudgetWorksheetSectionViewModel";

export default interface IBudgetWorksheetViewModel {
    title: string;
    sectionViewModels: IBudgetWorksheetSectionViewModel[];
    modeViewModel: null | ICommonModeViewModel;
    total: string;
    status: string;

    loadBudgetData: () => Promise<void>;
    saveBudgetData: () => Promise<void>;

    addSection: () => void;
}