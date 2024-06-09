
import IBudgetWorksheetSectionViewModel from "./IBudgetWorksheetSectionViewModel";

export default interface IBudgetWorksheetBudgetViewModel {
    title: string;
    sectionViewModels: IBudgetWorksheetSectionViewModel[];
    total: string;
    status: string;

    loadBudgetWorksheet: () => Promise<void>;
    saveBudgetWorksheet: () => Promise<void>;

    addSection: () => void;
}