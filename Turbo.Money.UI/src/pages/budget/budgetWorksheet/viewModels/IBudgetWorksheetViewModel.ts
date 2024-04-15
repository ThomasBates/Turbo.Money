
import ICommonModeViewModel from "pages/common/viewModels/ICommonModeViewModel";

import IBudgetWorksheetSectionViewModel from "./IBudgetWorksheetSectionViewModel";

export default interface IBudgetWorksheetViewModel {
    title: string;
    sectionViewModels: IBudgetWorksheetSectionViewModel[];
    modeViewModel: null | ICommonModeViewModel;
    total: string;
    status: string;

    loadBudget: () => Promise<void>;
    saveBudget: () => Promise<void>;

    addSection: () => void;
}