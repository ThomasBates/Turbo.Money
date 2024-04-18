
import IBudgetWorksheetAccountViewModel from "./IBudgetWorksheetAccountViewModel";

export default interface IBudgetWorksheetCategoryViewModel {

    name: string;
    accountViewModels: IBudgetWorksheetAccountViewModel[];
    total: string;

    showCategory: () => void;
    editCategory: () => void;
    deleteCategory: () => void;

    addAccount: () => void;
}
