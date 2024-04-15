
import IBudgetWorksheetCategoryViewModel from './IBudgetWorksheetCategoryViewModel';

export default interface IBudgetWorksheetSectionViewModel {
    name: string;
    categoryViewModels: IBudgetWorksheetCategoryViewModel[];
    total: string;

    showSection: () => void;
    editSection: () => void;
    deleteSection: () => void;

    addCategory: () => void;
}
