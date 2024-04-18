
import IModelItem from 'common/models/IModelItem';

import IBudgetAccount from 'models/budget/IBudgetAccount';
import IBudgetCategory from 'models/budget/IBudgetCategory';
import IBudgetSection from 'models/budget/IBudgetSection';

export default interface IBudgetWorksheetDataService {

    loadBudgetData: () => Promise<void>;
    saveBudgetData: () => Promise<void>;

    createBudgetSection: (item: IBudgetSection) => void;
    updateBudgetSection: (item: IBudgetSection) => void;
    deleteBudgetSection: (item: IBudgetSection) => void;
    readBudgetSection: (id: number) => IBudgetSection;
    listBudgetSections: () => IBudgetSection[];
    listBudgetSectionNames: () => IModelItem[];

    createBudgetCategory: (item: IBudgetCategory) => void;
    updateBudgetCategory: (item: IBudgetCategory) => void;
    deleteBudgetCategory: (item: IBudgetCategory) => void;
    readBudgetCategory: (id: number) => IBudgetCategory;
    listBudgetCategories: (parentSection?: IBudgetSection) => IBudgetCategory[];
    listBudgetCategoryNames: () => IModelItem[];

    createBudgetAccount: (item: IBudgetAccount) => void;
    updateBudgetAccount: (item: IBudgetAccount) => void;
    deleteBudgetAccount: (item: IBudgetAccount) => void;
    readBudgetAccount: (id: number) => IBudgetAccount;
    listBudgetAccounts: (parentCategory?: IBudgetCategory) => IBudgetAccount[];
    listBudgetAccountNames: () => IModelItem[];

    getBudgetTotal: () => string;
    getBudgetTotalAbsolute: () => string;
    getBudgetStatus: () => string;
    getBudgetSectionTotal: (item: IBudgetSection) => string;
    getBudgetCategoryTotal: (item: IBudgetCategory) => string;
    getBudgetAccountTotal: (item: IBudgetAccount) => string;
}

