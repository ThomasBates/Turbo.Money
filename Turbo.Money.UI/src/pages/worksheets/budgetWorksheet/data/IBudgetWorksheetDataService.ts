
import IModelItem from 'common/models/IModelItem';

import IBudgetAccount from 'models/budget/IBudgetAccount';
import IBudgetCategory from 'models/budget/IBudgetCategory';
import IBudgetSection from 'models/budget/IBudgetSection';
import IBudgetPeriod from 'models/budget/IBudgetPeriod';

export default interface IBudgetWorksheetDataService {

    loadBudgetPeriods: (periodSet?: string) => Promise<IBudgetPeriod[]>;
    loadBudgetWorksheet: (periodId: number) => Promise<void>;
    saveBudgetWorksheet: () => Promise<void>;

    createBudgetPeriod: (item: IBudgetPeriod) => Promise<null | IBudgetPeriod>;
    updateBudgetPeriod: (item: IBudgetPeriod) => Promise<null | IBudgetPeriod>;
    deleteBudgetPeriod: (item: IBudgetPeriod) => Promise<void>;
    readBudgetPeriod: (id: number) => Promise<null | IBudgetPeriod>;
    listBudgetPeriods: () => IBudgetPeriod[];
    listBudgetPeriodNames: () => IModelItem[];

    createBudgetSection: (item: IBudgetSection) => void;
    updateBudgetSection: (item: IBudgetSection) => void;
    deleteBudgetSection: (item: IBudgetSection) => void;
    readBudgetSection: (id: number) => null | IBudgetSection;
    listBudgetSections: () => IBudgetSection[];
    listBudgetSectionNames: () => IModelItem[];

    createBudgetCategory: (item: IBudgetCategory) => void;
    updateBudgetCategory: (item: IBudgetCategory) => void;
    deleteBudgetCategory: (item: IBudgetCategory) => void;
    readBudgetCategory: (id: number) => null | IBudgetCategory;
    listBudgetCategories: (parentSection?: IBudgetSection) => IBudgetCategory[];
    listBudgetCategoryNames: () => IModelItem[];

    createBudgetAccount: (item: IBudgetAccount) => void;
    updateBudgetAccount: (item: IBudgetAccount) => void;
    deleteBudgetAccount: (item: IBudgetAccount) => void;
    readBudgetAccount: (id: number) => null | IBudgetAccount;
    listBudgetAccounts: (parentCategory?: IBudgetCategory) => IBudgetAccount[];
    listBudgetAccountNames: () => IModelItem[];

    getBudgetTotal: () => string;
    getBudgetTotalAbsolute: () => string;
    getBudgetStatus: () => string;
    getBudgetSectionTotal: (item: IBudgetSection) => string;
    getBudgetCategoryTotal: (item: IBudgetCategory) => string;
    getBudgetAccountTotal: (item: IBudgetAccount) => string;
}

