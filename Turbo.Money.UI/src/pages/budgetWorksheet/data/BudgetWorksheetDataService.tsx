import React, { useState, useEffect } from "react";

import BudgetSectionDataService from "../../../setup/budgetSection/data/BudgetSectionDataService";
import BudgetCategoryDataService from "../../../setup/budgetCategory/data/BudgetCategoryDataService";
import BudgetAccountDataService from "../../../setup/budgetAccount/data/BudgetAccountDataService";

export default function BudgetWorksheetDataService() {
    const name = BudgetWorksheetDataService.name;

    const [sectionList, setSectionList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [accountList, setAccountList] = useState([]);

    useEffect(() => {
        retrieveSections();
        retrieveCategories();
        retrieveAccounts();
    }, []);

    const compareSections = (section1, section2) => {
        if (section1.direction > section2.direction) {
            return 1;
        }
        if (section1.direction < section2.direction) {
            return -1;
        }
        const name1 = section1.name.toUpperCase();
        const name2 = section2.name.toUpperCase();
        if (name1 > name2) {
            return 1;
        }
        if (name1 < name2) {
            return -1;
        }
        return 0;
    }

    const compareItems = (item1, item2) => {
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

    const retrieveSections = () => {
        BudgetSectionDataService.getAll()
            .then(response => {
                console.log(`${name}.${retrieveSections.name}: `, response.data);
                let sections = response.data
                    .map(section => ({ ...section, state: "read" }))
                    .sort(compareSections);
                setSectionList(sections);
            })
            .catch(e => {
                console.log(`${name}.${retrieveSections.name}: `, e);
            });
    };

    const retrieveCategories = () => {
        BudgetCategoryDataService.getAll()
            .then(response => {
                console.log(`${name}.${retrieveCategories.name}: `, response.data);
                let categories = response.data
                    .map(category => ({ ...category, state: "read" }))
                    .sort(compareItems);
                setCategoryList(categories);
            })
            .catch(e => {
                console.log(`${name}.${retrieveCategories.name}: `, e);
            });
    };

    const retrieveAccounts = () => {
        BudgetAccountDataService.getAll()
            .then(response => {
                console.log(`${name}.${retrieveAccounts.name}: `, response.data);
                let accounts = response.data
                    .map(account => ({ ...account, state: "read" }))
                    .sort(compareItems);
                setAccountList(accounts);
            })
            .catch(e => {
                console.log(`${name}.${retrieveAccounts.name}: `, e);
            });
    };

    const saveSections = async (sections) => {
        let createdIdMap = new Map();
        let deletedIdList = [];

        try {
            await Promise.all(
                sections.map(async section => {
                    switch (section.state) {
                        case "read":
                            break;
                        case "created":
                            const response = await BudgetSectionDataService.create(section);
                            const createdSection = response.data;
                            createdIdMap.set(section.id, createdSection.id);
                            break;
                        case "updated":
                            await BudgetSectionDataService.update(section.id, section);
                            break;
                        case "deleted":
                            await BudgetSectionDataService.remove(section.id);
                            deletedIdList.push(section.id);
                            break;
                    }
                })
            );
        } catch (ex) {
            console.log(ex);
        }

        let categories = categoryList;

        if (createdIdMap.size > 0) {
            categories = categories.map(category => {
                if (category.sectionId > 0)
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
                if (deletedIdList.includes(category.sectionId)) {
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

    const saveCategories = async (categories) => {
        let createdIdMap = new Map();
        let deletedIdList = [];

        try {
            await Promise.all(
                categories.map(async category => {
                    switch (category.state) {
                        case "read":
                            break;
                        case "created":
                            const response = await BudgetCategoryDataService.create(category);
                            const createdCategory = response.data;
                            createdIdMap.set(category.id, createdCategory.id);
                            break;
                        case "updated":
                            await BudgetCategoryDataService.update(category.id, category);
                            break;
                        case "deleted":
                            await BudgetCategoryDataService.remove(category.id);
                            deletedIdList.push(category.id);
                            break;
                    }
                })
            );
        } catch (ex) {
            console.log(ex);
        }

        let accounts = accountList;

        if (createdIdMap.size > 0) {
            accounts = accounts.map(account => {
                if (account.categoryId > 0)
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
                if (deletedIdList.includes(account.categoryId)) {
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

    const saveAccounts = async (accounts) => {
        try {
            await Promise.all(
                accounts.map(async account => {
                    switch (account.state) {
                        case "read":
                            break;
                        case "created":
                            await BudgetAccountDataService.create(account);
                            break;
                        case "updated":
                            await BudgetAccountDataService.update(account.id, account);
                            break;
                        case "deleted":
                            await BudgetAccountDataService.remove(account.id);
                            break;
                    }
                })
            );
        } catch (ex) {
            console.log(ex);
        }
    };

    const loadBudget = () => {
        retrieveSections();
        retrieveCategories();
        retrieveAccounts();
    };

    const saveBudget = async () => {
        const categories = await saveSections(sectionList);
        const accounts = await saveCategories(categories);
        await saveAccounts(accounts);
        loadBudget();
    };

    //  Generic Items ----------------------------------------------------------

    const createItem = (createdItem, list, setList, compareItems) => {
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

    const updateItem = (updatedItem, setList, compareItems) => {
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

    const deleteItem = (deletedItem, setList) => {
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

    const extractItem = (item) => {
        let target = {}
        for (let key in item) {
            if (key == "state")
                continue;
            target[key] = item[key];
        }
        return target;
    }

    const readItem = (id, list) => {
        let item = list.find(item => item.id == id);
        if (!item)
            return null;
        return extractItem(item);
    };

    const listItems = (list, keyName?, parentItem?) => {
        return list
            .filter(item =>
                (item.state != "deleted") &&
                (!keyName || !parentItem || item[keyName] == parentItem.id))
            .map(item => extractItem(item));
    };

    const listItemNames = (list) => {
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

    const createBudgetSection = (createdSection) => {
        createItem(createdSection, sectionList, setSectionList, compareSections);
    };

    const updateBudgetSection = (updatedSection) => {
        updateItem(updatedSection, setSectionList, compareSections);
    };

    const deleteBudgetSection = (deletedSection) => {
        deleteItem(deletedSection, setSectionList);
    };

    const readBudgetSection = (id) => {
        return readItem(id, sectionList);
    };

    const listBudgetSections = () => {
        return listItems(sectionList);
    };

    const listBudgetSectionNames = () => {
        return listItemNames(sectionList);
    };

    //  Budget Categories ------------------------------------------------------

    const createBudgetCategory = (createdCategory) => {
        createItem(createdCategory, categoryList, setCategoryList, compareItems);
    };

    const updateBudgetCategory = (updatedCategory) => {
        updateItem(updatedCategory, setCategoryList, compareItems);
    };

    const deleteBudgetCategory = (deletedCategory) => {
        deleteItem(deletedCategory, setCategoryList);
    };

    const readBudgetCategory = (id) => {
        return readItem(id, categoryList);
    };

    const listBudgetCategories = (parentSection?) => {
        return listItems(categoryList, "sectionId", parentSection);
    };

    const listBudgetCategoryNames = () => {
        return listItemNames(categoryList);
    };

    //  Budget Accounts --------------------------------------------------------

    const createBudgetAccount = (createdAccount) => {
        createItem(createdAccount, accountList, setAccountList, compareItems);
    };

    const updateBudgetAccount = (updatedAccount) => {
        updateItem(updatedAccount, setAccountList, compareItems);
    };

    const deleteBudgetAccount = (deletedAccount) => {
        deleteItem(deletedAccount, setAccountList);
    };

    const readBudgetAccount = (id) => {
        return readItem(id, accountList);
    };

    const listBudgetAccounts = (parentCategory?) => {
        return listItems(accountList, "categoryId", parentCategory);
    };

    const listBudgetAccountNames = () => {
        return listItemNames(accountList);
    };

    //  Totals -----------------------------------------------------------------

    const Currency = (number) => {
        const value = Number(number);

        const localeFormat = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        });

        return localeFormat.format(value);
    };

    const calcAccountTotal = (account) => {
        return account && account.state != "deleted" ? Number(account.amount) : 0;
    };

    const calcCategoryTotal = (category) => {
        if (!category || category.state == "deleted")
            return 0;

        if (!accountList || !accountList.length)
            return 0;

        const categoryTotal = accountList
            .filter(account => account.categoryId == category.id)
            .reduce((total, account) =>
                Number(total) + calcAccountTotal(account), 0);

        return Number(categoryTotal);
    };

    const calcSectionTotal = (section) => {
        if (!section || section.state == "deleted")
            return 0;

        if (!categoryList || !categoryList.length)
            return 0;

        const sectionTotal = categoryList
            .filter(category => category.sectionId == section.id)
            .reduce((total, category) =>
                Number(total) + calcCategoryTotal(category), 0);

        return Number(sectionTotal);
    };

    const calcBudgetTotal = () => {
        if (!sectionList || !sectionList.length)
            return;

        const budgetTotal = sectionList.reduce((total, section) => {
            const sectionTotal = calcSectionTotal(section);
            if (section.direction == "in")
                return Number(total) + Number(sectionTotal);
            return Number(total) - Number(sectionTotal);
        }, 0);

        return Number(budgetTotal);
    };

    const getBudgetTotal = () => {
        return Currency(calcBudgetTotal());
    };

    const getBudgetSectionTotal = (section) => {
        return Currency(calcSectionTotal(section));
    };

    const getBudgetCategoryTotal = (category) => {
        return Currency(calcCategoryTotal(category));
    };

    const getBudgetAccountTotal = (account) => {
        return Currency(calcAccountTotal(account));
    };

    return {
        loadBudget,
        saveBudget,

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
        getBudgetSectionTotal,
        getBudgetCategoryTotal,
        getBudgetAccountTotal,
    };
};
