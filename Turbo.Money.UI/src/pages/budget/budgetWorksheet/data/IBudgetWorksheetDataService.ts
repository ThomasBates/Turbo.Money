
import IBudgetAccount from 'models/budget/IBudgetAccount';
import IBudgetCategory from 'models/budget/IBudgetCategory';
import IBudgetSection from 'models/budget/IBudgetSection';

export interface IBudgetItem {
    // common
    id: number;
    name: string;
    description?: string;
    state?: string;
    [key: string]: string | number | undefined;

    // section
    direction?: string;

    // category
    sectionId?: number;

    // account
    categoryId?: number;
    amount?: string;
    type?: string;
    method?: string;

}

export interface INameItem {
    id: number;
    name: string;
}

export interface IBudgetWorksheetDataService {

    loadBudget: () => Promise<void>;
    saveBudget: () => Promise<void>;

    createBudgetSection: (item: IBudgetSection) => void;
    updateBudgetSection: (item: IBudgetSection) => void;
    deleteBudgetSection: (item: IBudgetSection) => void;
    readBudgetSection: (id: number) => IBudgetSection;
    listBudgetSections: () => IBudgetSection[];
    listBudgetSectionNames: () => INameItem[];

    createBudgetCategory: (item: IBudgetCategory) => void;
    updateBudgetCategory: (item: IBudgetCategory) => void;
    deleteBudgetCategory: (item: IBudgetCategory) => void;
    readBudgetCategory: (id: number) => IBudgetCategory;
    listBudgetCategories: (parentSection?: IBudgetSection) => IBudgetCategory[];
    listBudgetCategoryNames: () => INameItem[];

    createBudgetAccount: (item: IBudgetAccount) => void;
    updateBudgetAccount: (item: IBudgetAccount) => void;
    deleteBudgetAccount: (item: IBudgetAccount) => void;
    readBudgetAccount: (id: number) => IBudgetAccount;
    listBudgetAccounts: (parentCategory?: IBudgetCategory) => IBudgetAccount[];
    listBudgetAccountNames: () => INameItem[];

    getBudgetTotal: () => string;
    getBudgetTotalAbsolute: () => string;
    getBudgetStatus: () => string;
    getBudgetSectionTotal: (item: IBudgetSection) => string;
    getBudgetCategoryTotal: (item: IBudgetCategory) => string;
    getBudgetAccountTotal: (item: IBudgetAccount) => string;
}

