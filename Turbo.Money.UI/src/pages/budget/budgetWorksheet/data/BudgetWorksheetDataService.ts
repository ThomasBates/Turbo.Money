import { useState } from "react";

import BudgetSectionDataProvider from "data/budgetSection/BudgetSectionDataProvider";
import BudgetCategoryDataProvider from "data/budgetCategory/BudgetCategoryDataProvider";
import BudgetAccountDataProvider from "data/budgetAccount/BudgetAccountDataProvider";

import IBudgetAccount from 'models/budget/IBudgetAccount';
import IBudgetCategory from 'models/budget/IBudgetCategory';
import IBudgetSection from 'models/budget/IBudgetSection';

import ILoggerService from "services/logger/ILoggerService";

import { IBudgetItem, INameItem, IBudgetWorksheetDataService }
    from "./IBudgetWorksheetDataService";


type ListSetter = (f: (prevState: IBudgetItem[]) => IBudgetItem[]) => void;
type ItemComparer = (item1: IBudgetItem, item2: IBudgetItem) => number;

export default function BudgetWorksheetDataService(logger: ILoggerService): IBudgetWorksheetDataService {
    const module = BudgetWorksheetDataService.name;
    const category = 'BudgetWorksheet';

    const [sectionList, setSectionList] = useState<IBudgetItem[]>([]);
    const [categoryList, setCategoryList] = useState<IBudgetItem[]>([]);
    const [accountList, setAccountList] = useState<IBudgetItem[]>([]);

    const compareItems = (item1: IBudgetItem, item2: IBudgetItem) => {
        if (item1.direction && item2.direction) {
            if (item1.direction > item2.direction) {
                return 1;
            }
            if (item1.direction < item2.direction) {
                return -1;
            }
        }

        const name1 = item1.name.toUpperCase();
        const name2 = item2.name.toUpperCase();
        if (name1 > name2) {
            return 1;
        }
        if (name1 < name2) {
            return -1;
        }
        return 0;
    }

    //  Data Access ------------------------------------------------------------

    const retrieveSections = async () => {
        const context = `${module}.${retrieveSections.name}`;
        try {
            const response = await BudgetSectionDataProvider.getAll();
            logger.debug(category, context, 'response.data =', response.data);

            const sections = response.data
                .map((section: IBudgetItem) => ({ ...section, state: "read" }))
                .sort(compareItems);
            setSectionList(sections);

        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
        }
    };

    const retrieveCategories = async () => {
        const context = `${module}.${retrieveCategories.name}`;
        try {
            const response = await BudgetCategoryDataProvider.getAll();
            logger.debug(category, context, 'response.data =', response.data);

            const categories = response.data
                .map((category: IBudgetItem) => ({ ...category, state: "read" }))
                .sort(compareItems);
            setCategoryList(categories);

        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
        }
    };

    const retrieveAccounts = async () => {
        const context = `${module}.${retrieveAccounts.name}`;
        try {
            const response = await BudgetAccountDataProvider.getAll();
            logger.debug(category, context, 'response.data =', response.data);

            const accounts = response.data
                .map((account: IBudgetItem) => ({ ...account, state: "read" }))
                .sort(compareItems);
            setAccountList(accounts);

        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
        }
    };

    const saveSections = async (sections: IBudgetItem[]) => {
        const context = `${module}.${saveSections.name}`;
        const createdIdMap = new Map();
        const deletedIdList: number[] = [];

        try {
            await Promise.all(
                sections.map(async section => {
                    switch (section.state) {
                        case "read":
                            break;
                        case "created": {
                            const response = await BudgetSectionDataProvider.create(section);
                            const createdSection = response.data;
                            createdIdMap.set(section.id, createdSection.id);
                            break;
                        }
                        case "updated":
                            await BudgetSectionDataProvider.update(section.id, section);
                            break;
                        case "deleted":
                            await BudgetSectionDataProvider.remove(section.id);
                            deletedIdList.push(section.id);
                            break;
                    }
                })
            );
        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
        }

        let categories = categoryList;

        if (createdIdMap.size > 0) {
            categories = categories.map(category => {
                if (category.sectionId && category.sectionId > 0)
                    return category;

                const newId = createdIdMap.get(category.sectionId);
                if (newId) {
                    return {
                        ...category,
                        sectionId: newId
                    };
                }
                return category;
            });
        }

        if (deletedIdList.length > 0) {
            categories = categories.map(category => {
                if (category.sectionId && deletedIdList.includes(category.sectionId)) {
                    return {
                        ...category,
                        state: "deleted"
                    };
                }
                return category;
            });
        }

        return categories;
    };

    const saveCategories = async (categories: IBudgetItem[]) => {
        const context = `${module}.${saveCategories.name}`;
        const createdIdMap = new Map();
        const deletedIdList: number[] = [];

        try {
            await Promise.all(
                categories.map(async category => {
                    switch (category.state) {
                        case "read":
                            break;
                        case "created": {
                            const response = await BudgetCategoryDataProvider.create(category);
                            const createdCategory = response.data;
                            createdIdMap.set(category.id, createdCategory.id);
                            break;
                        }
                        case "updated":
                            await BudgetCategoryDataProvider.update(category.id, category);
                            break;
                        case "deleted":
                            await BudgetCategoryDataProvider.remove(category.id);
                            deletedIdList.push(category.id);
                            break;
                    }
                })
            );
        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
        }

        let accounts = accountList;

        if (createdIdMap.size > 0) {
            accounts = accounts.map(account => {
                if (account.categoryId && account.categoryId > 0)
                    return account;

                const newId = createdIdMap.get(account.categoryId);
                if (newId) {
                    return {
                        ...account,
                        categoryId: newId
                    };
                }
                return account;
            });
        }

        if (deletedIdList.length > 0) {
            accounts = accounts.map(account => {
                if (account.categoryId && deletedIdList.includes(account.categoryId)) {
                    return {
                        ...account,
                        state: "deleted"
                    };
                }
                return account;
            });
        }

        return accounts;
    };

    const saveAccounts = async (accounts: IBudgetItem[]) => {
        const context = `${module}.${saveAccounts.name}`;
        try {
            await Promise.all(
                accounts.map(async account => {
                    switch (account.state) {
                        case "read":
                            break;
                        case "created":
                            await BudgetAccountDataProvider.create(account);
                            break;
                        case "updated":
                            await BudgetAccountDataProvider.update(account.id, account);
                            break;
                        case "deleted":
                            await BudgetAccountDataProvider.remove(account.id);
                            break;
                    }
                })
            );
        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
        }
    };

    const loadBudgetData = async () => {
        await retrieveSections();
        await retrieveCategories();
        await retrieveAccounts();
    };

    const saveBudgetData = async () => {
        const categories = await saveSections(sectionList);
        const accounts = await saveCategories(categories);
        await saveAccounts(accounts);
        await loadBudgetData();
    };

    //  Generic Items ----------------------------------------------------------

    const createItem = (createdItem: IBudgetItem, list: IBudgetItem[], setList: ListSetter, compareItems: ItemComparer) => {
        const minId = list.reduce((min, item) => {
            return min < item.id ? min : item.id;
        }, 0);
        createdItem = {
            ...createdItem,
            id: minId - 1,
            state: "created"
        };
        setList(prevList => [...prevList, createdItem].sort(compareItems));
    };

    const updateItem = (updatedItem: IBudgetItem, setList: ListSetter, compareItems: ItemComparer) => {
        setList(prevList => prevList.map(item => {
            if (item.id == updatedItem.id) {
                return {
                    ...updatedItem,
                    state: updatedItem.state == "created" ? "created" : "updated"
                };
            }
            return item;
        }).sort(compareItems));
    }

    const deleteItem = (deletedItem: IBudgetItem, setList: ListSetter) => {
        setList(prevList => prevList.map(item => {
            if (item.id == deletedItem.id) {
                return {
                    ...item,
                    state: "deleted"
                };
            }
            return item;
        }));
    };

    const extractItem = (item: IBudgetItem): IBudgetItem => {
        const result: IBudgetItem = {
            id: -1,
            name: "",
            description: "",
        }
        for (const key in item) {
            if (key == "state")
                continue;
            result[key] = item[key];
        }
        return result;
    }

    const readItem = (id: number, list: IBudgetItem[]): IBudgetItem | null => {
        const item = list.find(item => item.id == id);
        if (!item)
            return null;
        return extractItem(item);
    };

    const listItems = (list: IBudgetItem[], keyName?: string, parentItem?: IBudgetItem): IBudgetItem[] => {
        return list
            .filter(item =>
                (item.state != "deleted") &&
                (!keyName || !parentItem || item[keyName] == parentItem.id))
            .map(item => extractItem(item));
    };

    const listItemNames = (list: IBudgetItem[]): INameItem[] => {
        return list
            .filter(item => item.state != "deleted")
            .map(item => {
                return {
                    id: item.id,
                    name: item.name,
                }
            });
    };

    //  Budget Sections --------------------------------------------------------

    const createBudgetSection = (createdSection: IBudgetSection): void => {
        createItem(createdSection as IBudgetItem, sectionList, setSectionList, compareItems);
    };

    const updateBudgetSection = (updatedSection: IBudgetSection): void => {
        updateItem(updatedSection as IBudgetItem, setSectionList, compareItems);
    };

    const deleteBudgetSection = (deletedSection: IBudgetSection): void => {
        deleteItem(deletedSection as IBudgetItem, setSectionList);
    };

    const readBudgetSection = (id: number): IBudgetSection => {
        return readItem(id, sectionList) as IBudgetSection;
    };

    const listBudgetSections = (): IBudgetSection[] => {
        return listItems(sectionList) as IBudgetSection[];
    };

    const listBudgetSectionNames = (): INameItem[] => {
        return listItemNames(sectionList);
    };

    //  Budget Categories ------------------------------------------------------

    const createBudgetCategory = (createdCategory: IBudgetCategory): void => {
        createItem(createdCategory as IBudgetItem, categoryList, setCategoryList, compareItems);
    };

    const updateBudgetCategory = (updatedCategory: IBudgetCategory): void => {
        updateItem(updatedCategory as IBudgetItem, setCategoryList, compareItems);
    };

    const deleteBudgetCategory = (deletedCategory: IBudgetCategory): void => {
        deleteItem(deletedCategory as IBudgetItem, setCategoryList);
    };

    const readBudgetCategory = (id: number): IBudgetCategory => {
        return readItem(id, categoryList) as IBudgetCategory;
    };

    const listBudgetCategories = (parentSection?: IBudgetSection): IBudgetCategory[] => {
        return listItems(categoryList, "sectionId", parentSection as IBudgetItem) as IBudgetCategory[];
    };

    const listBudgetCategoryNames = (): INameItem[] => {
        const context = `${module}.${listBudgetCategoryNames.name}`
        const names = listItemNames(categoryList);
        logger.debug(category, context, 'names =', names);
        return names;
    };

    //  Budget Accounts --------------------------------------------------------

    const createBudgetAccount = (createdAccount: IBudgetAccount): void => {
        createItem(createdAccount as IBudgetItem, accountList, setAccountList, compareItems);
    };

    const updateBudgetAccount = (updatedAccount: IBudgetAccount): void => {
        updateItem(updatedAccount as IBudgetItem, setAccountList, compareItems);
    };

    const deleteBudgetAccount = (deletedAccount: IBudgetAccount): void => {
        deleteItem(deletedAccount as IBudgetItem, setAccountList);
    };

    const readBudgetAccount = (id: number): IBudgetAccount => {
        return readItem(id, accountList) as IBudgetAccount;
    };

    const listBudgetAccounts = (parentCategory?: IBudgetCategory): IBudgetAccount[] => {
        return listItems(accountList, "categoryId", parentCategory as IBudgetItem) as IBudgetAccount[];
    };

    const listBudgetAccountNames = (): INameItem[] => {
        const context = `${module}.${listBudgetAccountNames.name}`
        const names = listItemNames(accountList);
        logger.debug(category, context, 'names =', names);
        return names;
    };

    //  Totals -----------------------------------------------------------------

    const getCurrencyFormat = (number: number) => {
        const value = Number(number);

        const localeFormat = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        });

        return localeFormat.format(value);
    };

    const calcAccountTotal = (account: IBudgetAccount) => {
        if (!account)
            return 0;

        const item = account as IBudgetItem;
        if (item.state == "deleted")
            return 0;

        return Number(account.amount);
    };

    const calcCategoryTotal = (category: IBudgetCategory) => {
        if (!category)
            return 0;

        const item = category as IBudgetItem;
        if (item.state == "deleted")
            return 0;

        if (!accountList || !accountList.length)
            return 0;

        const categoryTotal = accountList
            .filter(account => account.categoryId == category.id)
            .reduce((total, account) =>
                Number(total) + calcAccountTotal(account as IBudgetAccount), 0);

        return Number(categoryTotal);
    };

    const calcSectionTotal = (section: IBudgetSection) => {
        if (!section)
            return 0;

        const item = section as IBudgetItem;
        if (item.state == "deleted")
            return 0;

        if (!categoryList || !categoryList.length)
            return 0;

        const sectionTotal = categoryList
            .filter(category => category.sectionId == section.id)
            .reduce((total, category) =>
                Number(total) + calcCategoryTotal(category as IBudgetCategory), 0);

        return Number(sectionTotal);
    };

    const calcBudgetTotal = () => {
        if (!sectionList || !sectionList.length)
            return 0;

        const budgetTotal = sectionList.reduce((total, section) => {
            const sectionTotal = calcSectionTotal(section as IBudgetSection);
            if (section.direction == "in")
                return Number(total) + Number(sectionTotal);
            return Number(total) - Number(sectionTotal);
        }, 0);

        return Number(budgetTotal);
    };

    const getBudgetTotal = () => {
        return getCurrencyFormat(calcBudgetTotal());
    };

    const getBudgetTotalAbsolute = (): string => {
        const total = calcBudgetTotal();
        return getCurrencyFormat(Math.abs(total));
    };

    const getBudgetStatus = () => {
        const total = calcBudgetTotal();
        if (total < 0)
            return 'Deficit';
        return 'Surplus';
    };

    const getBudgetSectionTotal = (section: IBudgetSection) => {
        return getCurrencyFormat(calcSectionTotal(section));
    };

    const getBudgetCategoryTotal = (category: IBudgetCategory) => {
        return getCurrencyFormat(calcCategoryTotal(category));
    };

    const getBudgetAccountTotal = (account: IBudgetAccount) => {
        return getCurrencyFormat(calcAccountTotal(account));
    };

    return {
        loadBudgetData,
        saveBudgetData,

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