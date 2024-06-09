import { useState } from "react";

import IModelItem from "common/models/IModelItem";

import IBasicDataProvider from "data/interfaces/basic/IBasicDataProvider";
import IBudgetDataProvider from "data/interfaces/services/IBudgetDataProvider";

import IBudgetAccount from 'models/budget/IBudgetAccount';
import IBudgetCategory from 'models/budget/IBudgetCategory';
import IBudgetPeriod from "models/budget/IBudgetPeriod";
import IBudgetSection from 'models/budget/IBudgetSection';
import IBudgetWorksheet from "models/budget/IBudgetWorksheet";

import ILoggerService from "services/logger/ILoggerService";
import { formatCurrency } from "services/tools/tools";

import IBudgetWorksheetDataService from "./IBudgetWorksheetDataService";

export default function BudgetWorksheetDataService(
    logger: ILoggerService,
    periodDataProvider: IBasicDataProvider<IBudgetPeriod>,
    dataProvider: IBudgetDataProvider,
): IBudgetWorksheetDataService {

    const module = BudgetWorksheetDataService.name;
    const category = 'BudgetWorksheet';

    const [periodList, setPeriodList] = useState<IBudgetPeriod[]>([]);
    const [worksheet, setWorksheet] = useState<null | IBudgetWorksheet>(null);

    //  Exported Data Access ---------------------------------------------------

    const loadBudgetPeriods = async (periodSet?: string): Promise<IBudgetPeriod[]> => {
        const context = `${module}.${loadBudgetPeriods.name}`;
        try {
            const response = await dataProvider.getBudgetPeriodList();
            logger.debug(category, context, 'response.data =', response.data);

            setPeriodList(response.data);

            if (!periodSet)
                return response.data;

            const isSandbox = (periodSet == 'sandbox');
            const isClosed = (periodSet == 'closed');

            return response.data.filter((period: IBudgetPeriod) =>
                period.isSandbox == isSandbox &&
                period.isClosed == isClosed);

        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
            return [];
        }
    };

    const loadBudgetWorksheet = async (periodId: number) => {
        const context = `${module}.${loadBudgetWorksheet.name}`;
        logger.debug(category, context, 'periodId =', periodId);
        try {
            const response = await dataProvider.loadBudgetWorksheet(periodId);
            logger.debug(category, context, 'response.data =', response.data);
            setWorksheet(response.data);
        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
        }
    };

    const saveBudgetWorksheet = async () => {
        if (!worksheet)
            return;

        await dataProvider.saveBudgetWorksheet(worksheet);

        await loadBudgetWorksheet(worksheet.period.id);
    };

    //  Generic Items ----------------------------------------------------------

    const createItem = (createdItem: IModelItem, list: IModelItem[]) => {
        const minId = list.reduce((min, item) => {
            return min < item.id ? min : item.id;
        }, 0);
        createdItem = {
            ...createdItem,
            id: minId - 1,
            state: "created"
        };
        list.push(createdItem);
    };

    const updateItem = (updatedItem: IModelItem, list: IModelItem[]) => {
        const item = list.find(item => item.id == updatedItem.id);
        if (item)
            Object.assign(item, {
                ...updatedItem,
                state: updatedItem.state == "created" ? "created" : "updated"
            });
    }

    const deleteItem = (deletedItem: IModelItem, list: IModelItem[]) => {
        const item = list.find(item => item.id == deletedItem.id);
        if (item)
            Object.assign(item, {
                ...deletedItem,
                state: "deleted"
            });
    };

    const extractItem = (item: IModelItem): IModelItem => {
        const result: IModelItem = {
            id: -1,
            name: "",
        }
        for (const key in item) {
            if (key == "state")
                continue;
            result[key] = item[key];
        }
        return result;
    }

    const readItem = (id: number, list: IModelItem[]): IModelItem | null => {
        const item = list.find(item => item.id == id);
        if (!item)
            return null;
        return extractItem(item);
    };

    const listItems = (list: IModelItem[], keyName?: string, parentItem?: IModelItem): IModelItem[] => {
        return list
            .filter(item =>
                (item.state != "deleted") &&
                (!keyName || !parentItem || item[keyName] == parentItem.id))
            .map(item => extractItem(item));
    };

    const listItemNames = (list: IModelItem[]): IModelItem[] => {
        return list
            .filter(item => item.state != "deleted")
            .map(item => {
                return {
                    id: item.id,
                    name: item.name,
                }
            });
    };

    //  Budget Periods --------------------------------------------------------

    const createBudgetPeriod = async (createdPeriod: IBudgetPeriod): Promise<null | IBudgetPeriod> => {
        const context = `${module}.${createBudgetPeriod.name}`;

        if (!createdPeriod) {
            logger.error(category, context, 'createdPeriod is undefined.');
            return null;
        }

        try {
            const response = await periodDataProvider.create(createdPeriod);
            logger.debug(category, context, 'response.data =', response.data);
            createItem(response.data as IModelItem, periodList);
            return response.data as IBudgetPeriod;
        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
            return null;
        }
    };

    const updateBudgetPeriod = async (updatedPeriod: IBudgetPeriod): Promise<null | IBudgetPeriod> => {
        const context = `${module}.${updateBudgetPeriod.name}`;

        if (!updatedPeriod || !updatedPeriod.id) {
            logger.error(category, context, 'createdPeriod is undefined.');
            return null;
        }

        try {
            const response = await periodDataProvider.update(updatedPeriod.id, updatedPeriod);
            logger.debug(category, context, 'response.data =', response.data);
            updateItem(response.data as IModelItem, periodList);
            return response.data as IBudgetPeriod;
        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
            return null;
        }
    };

    const deleteBudgetPeriod = async (deletedPeriod: IBudgetPeriod): Promise<void> => {
        const context = `${module}.${deleteBudgetPeriod.name}`;

        deleteItem(deletedPeriod as IModelItem, periodList);

        if (!deletedPeriod || !deletedPeriod.id) {
            logger.error(category, context, 'period cannot be deleted.');
            return;
        }

        try {
            const response = await periodDataProvider.remove(deletedPeriod.id);
            logger.debug(category, context, 'response.data =', response.data);
        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
        }
    };

    const readBudgetPeriod = async (id: number): Promise<null | IBudgetPeriod> => {
        return readItem(id, periodList) as IBudgetPeriod;
    };

    const listBudgetPeriods = (): IBudgetPeriod[] => {
        return listItems(periodList) as IBudgetPeriod[];
    };

    const listBudgetPeriodNames = (): IModelItem[] => {
        return listItemNames(periodList);
    };

    //  Budget Sections --------------------------------------------------------

    const createBudgetSection = (createdSection: IBudgetSection): void => {
        if (!worksheet)
            return;
        createItem(createdSection as IModelItem, worksheet.sectionList);
    };

    const updateBudgetSection = (updatedSection: IBudgetSection): void => {
        if (!worksheet)
            return;
        updateItem(updatedSection as IModelItem, worksheet.sectionList);
    };

    const deleteBudgetSection = (deletedSection: IBudgetSection): void => {
        if (!worksheet)
            return;
        deleteItem(deletedSection as IModelItem, worksheet.sectionList);
    };

    const readBudgetSection = (id: number): null | IBudgetSection => {
        if (!worksheet)
            return null;
        return readItem(id, worksheet.sectionList) as IBudgetSection;
    };

    const listBudgetSections = (): IBudgetSection[] => {
        if (!worksheet)
            return [];
        return listItems(worksheet.sectionList) as IBudgetSection[];
    };

    const listBudgetSectionNames = (): IModelItem[] => {
        if (!worksheet)
            return [];
        return listItemNames(worksheet.sectionList);
    };

    //  Budget Categories ------------------------------------------------------

    const createBudgetCategory = (createdCategory: IBudgetCategory): void => {
        if (!worksheet)
            return;
        createItem(createdCategory as IModelItem, worksheet.categoryList);
    };

    const updateBudgetCategory = (updatedCategory: IBudgetCategory): void => {
        if (!worksheet)
            return;
        updateItem(updatedCategory as IModelItem, worksheet.categoryList);
    };

    const deleteBudgetCategory = (deletedCategory: IBudgetCategory): void => {
        if (!worksheet)
            return;
        deleteItem(deletedCategory as IModelItem, worksheet.categoryList);
    };

    const readBudgetCategory = (id: number): null | IBudgetCategory => {
        if (!worksheet)
            return null;
        return readItem(id, worksheet.categoryList) as IBudgetCategory;
    };

    const listBudgetCategories = (parentSection?: IBudgetSection): IBudgetCategory[] => {
        if (!worksheet)
            return [];
        return listItems(worksheet.categoryList, "sectionId", parentSection as IModelItem) as IBudgetCategory[];
    };

    const listBudgetCategoryNames = (): IModelItem[] => {
        if (!worksheet)
            return [];
        return listItemNames(worksheet.categoryList);
    };

    //  Budget Accounts --------------------------------------------------------

    const createBudgetAccount = (createdAccount: IBudgetAccount): void => {
        if (!worksheet)
            return;
        createItem(createdAccount as IModelItem, worksheet.accountList);
    };

    const updateBudgetAccount = (updatedAccount: IBudgetAccount): void => {
        if (!worksheet)
            return;
        updateItem(updatedAccount as IModelItem, worksheet.accountList);
    };

    const deleteBudgetAccount = (deletedAccount: IBudgetAccount): void => {
        if (!worksheet)
            return;
        deleteItem(deletedAccount as IModelItem, worksheet.accountList);
    };

    const readBudgetAccount = (id: number): null | IBudgetAccount => {
        if (!worksheet)
            return null;
        return readItem(id, worksheet.accountList) as IBudgetAccount;
    };

    const listBudgetAccounts = (parentCategory?: IBudgetCategory): IBudgetAccount[] => {
        if (!worksheet)
            return [];
        return listItems(worksheet.accountList, "categoryId", parentCategory as IModelItem) as IBudgetAccount[];
    };

    const listBudgetAccountNames = (): IModelItem[] => {
        if (!worksheet)
            return [];
        return listItemNames(worksheet.accountList);
    };

    //  Totals -----------------------------------------------------------------

    const calcAccountTotal = (account: IBudgetAccount) => {
        if (!account)
            return 0;

        const item = account as IModelItem;
        if (item.state == "deleted")
            return 0;

        return Number(account.amount);
    };

    const calcCategoryTotal = (category: IBudgetCategory) => {
        if (!category)
            return 0;

        const item = category as IModelItem;
        if (item.state == "deleted")
            return 0;

        if (!worksheet || !worksheet.accountList.length)
            return 0;

        const categoryTotal = worksheet.accountList
            .filter(account => account.categoryId == category.id)
            .reduce((total, account) =>
                Number(total) + calcAccountTotal(account as IBudgetAccount), 0);

        return Number(categoryTotal);
    };

    const calcSectionTotal = (section: IBudgetSection) => {
        if (!section)
            return 0;

        const item = section as IModelItem;
        if (item.state == "deleted")
            return 0;

        if (!worksheet || !worksheet.categoryList.length)
            return 0;

        const sectionTotal = worksheet.categoryList
            .filter(category => category.sectionId == section.id)
            .reduce((total, category) =>
                Number(total) + calcCategoryTotal(category as IBudgetCategory), 0);

        return Number(sectionTotal);
    };

    const calcBudgetTotal = () => {
        if (!worksheet || !worksheet.sectionList.length)
            return 0;

        const budgetTotal = worksheet.sectionList.reduce((total, section) => {
            const sectionTotal = calcSectionTotal(section as IBudgetSection);
            if (section.direction == "in")
                return Number(total) + Number(sectionTotal);
            return Number(total) - Number(sectionTotal);
        }, 0);

        return Number(budgetTotal);
    };

    const getBudgetTotal = () => {
        return formatCurrency(calcBudgetTotal());
    };

    const getBudgetTotalAbsolute = (): string => {
        const total = calcBudgetTotal();
        return formatCurrency(Math.abs(total));
    };

    const getBudgetStatus = () => {
        const total = calcBudgetTotal();
        if (total < 0)
            return 'deficit';
        return 'surplus';
    };

    const getBudgetSectionTotal = (section: IBudgetSection) => {
        return formatCurrency(calcSectionTotal(section));
    };

    const getBudgetCategoryTotal = (category: IBudgetCategory) => {
        return formatCurrency(calcCategoryTotal(category));
    };

    const getBudgetAccountTotal = (account: IBudgetAccount) => {
        return formatCurrency(calcAccountTotal(account));
    };

    return {

        loadBudgetPeriods,
        loadBudgetWorksheet,
        saveBudgetWorksheet,

        createBudgetPeriod,
        updateBudgetPeriod,
        deleteBudgetPeriod,
        readBudgetPeriod,
        listBudgetPeriods,
        listBudgetPeriodNames,

        createBudgetSection,
        updateBudgetSection,
        deleteBudgetSection,
        readBudgetSection,
        listBudgetSections,
        listBudgetSectionNames,

        createBudgetCategory,
        updateBudgetCategory,
        deleteBudgetCategory,
        readBudgetCategory,
        listBudgetCategories,
        listBudgetCategoryNames,

        createBudgetAccount,
        updateBudgetAccount,
        deleteBudgetAccount,
        readBudgetAccount,
        listBudgetAccounts,
        listBudgetAccountNames,

        getBudgetTotal,
        getBudgetTotalAbsolute,
        getBudgetStatus,
        getBudgetSectionTotal,
        getBudgetCategoryTotal,
        getBudgetAccountTotal,
    };
}
