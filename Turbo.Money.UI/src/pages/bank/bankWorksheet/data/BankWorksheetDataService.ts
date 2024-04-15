import { useState } from "react";

import BankBankDataProvider from "data/bankBank/BankBankDataProvider";
import BankAccountDataProvider from "data/bankAccount/BankAccountDataProvider";

import IBankAccount from 'models/bank/IBankAccount';
import IBankBank from 'models/bank/IBankBank';

import ILoggerService from "services/logger/ILoggerService";

import { IBankItem, INameItem, IBankWorksheetDataService }
    from "./IBankWorksheetDataService";


type ListSetter = (f: (prevState: IBankItem[]) => IBankItem[]) => void;
type ItemComparer = (item1: IBankItem, item2: IBankItem) => number;

export default function BankWorksheetDataService(logger: ILoggerService): IBankWorksheetDataService {
    const module = BankWorksheetDataService.name;
    const category = 'BankWorksheet';

    const [bankList, setBankList] = useState<IBankItem[]>([]);
    const [accountList, setAccountList] = useState<IBankItem[]>([]);

    const compareItems = (item1: IBankItem, item2: IBankItem) => {
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

    const retrieveBanks = async () => {
        const context = `${module}.${retrieveBanks.name}`;
        try {
            const response = await BankBankDataProvider.getAll();
            logger.debug(category, context, 'response.data =', response.data);

            const banks = response.data
                .map((bank: IBankItem) => ({ ...bank, state: "read" }))
                .sort(compareItems);
            setBankList(banks);

        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
        }
    };

    const retrieveAccounts = async () => {
        const context = `${module}.${retrieveAccounts.name}`;
        try {
            const response = await BankAccountDataProvider.getAll();
            logger.debug(category, context, 'response.data =', response.data);

            const accounts = response.data
                .map((account: IBankItem) => ({ ...account, state: "read" }))
                .sort(compareItems);
            setAccountList(accounts);

        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
        }
    };

    const saveBanks = async (banks: IBankItem[]) => {
        const context = `${module}.${saveBanks.name}`;
        const createdIdMap = new Map();
        const deletedIdList: number[] = [];

        try {
            await Promise.all(
                banks.map(async bank => {
                    switch (bank.state) {
                        case "read":
                            break;
                        case "created": {
                            const response = await BankBankDataProvider.create(bank);
                            const createdBank = response.data;
                            createdIdMap.set(bank.id, createdBank.id);
                            break;
                        }
                        case "updated":
                            await BankBankDataProvider.update(bank.id, bank);
                            break;
                        case "deleted":
                            await BankBankDataProvider.remove(bank.id);
                            deletedIdList.push(bank.id);
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
                if (account.bankId && account.bankId > 0)
                    return account;

                const newId = createdIdMap.get(account.bankId);
                if (newId) {
                    return {
                        ...account,
                        bankId: newId
                    };
                }
                return account;
            });
        }

        if (deletedIdList.length > 0) {
            accounts = accounts.map(account => {
                if (account.bankId && deletedIdList.includes(account.bankId)) {
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

    const saveAccounts = async (accounts: IBankItem[]) => {
        const context = `${module}.${saveAccounts.name}`;
        try {
            await Promise.all(
                accounts.map(async account => {
                    switch (account.state) {
                        case "read":
                            break;
                        case "created":
                            await BankAccountDataProvider.create(account);
                            break;
                        case "updated":
                            await BankAccountDataProvider.update(account.id, account);
                            break;
                        case "deleted":
                            await BankAccountDataProvider.remove(account.id);
                            break;
                    }
                })
            );
        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
        }
    };

    const loadBankData = async () => {
        await retrieveBanks();
        await retrieveAccounts();
    };

    const saveBankData = async () => {
        const accounts = await saveBanks(bankList);
        await saveAccounts(accounts);
        await loadBankData();
    };

    //  Generic Items ----------------------------------------------------------

    const createItem = (createdItem: IBankItem, list: IBankItem[], setList: ListSetter, compareItems: ItemComparer) => {
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

    const updateItem = (updatedItem: IBankItem, setList: ListSetter, compareItems: ItemComparer) => {
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

    const deleteItem = (deletedItem: IBankItem, setList: ListSetter) => {
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

    const extractItem = (item: IBankItem): IBankItem => {
        const result: IBankItem = {
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

    const readItem = (id: number, list: IBankItem[]): IBankItem | null => {
        const item = list.find(item => item.id == id);
        if (!item)
            return null;
        return extractItem(item);
    };

    const listItems = (list: IBankItem[], keyName?: string, parentItem?: IBankItem): IBankItem[] => {
        return list
            .filter(item =>
                (item.state != "deleted") &&
                (!keyName || !parentItem || item[keyName] == parentItem.id))
            .map(item => extractItem(item));
    };

    const listItemNames = (list: IBankItem[]): INameItem[] => {
        return list
            .filter(item => item.state != "deleted")
            .map(item => {
                return {
                    id: item.id,
                    name: item.name,
                }
            });
    };

    //  Bank Banks --------------------------------------------------------

    const createBankBank = (createdBank: IBankBank): void => {
        createItem(createdBank as IBankItem, bankList, setBankList, compareItems);
    };

    const updateBankBank = (updatedBank: IBankBank): void => {
        updateItem(updatedBank as IBankItem, setBankList, compareItems);
    };

    const deleteBankBank = (deletedBank: IBankBank): void => {
        deleteItem(deletedBank as IBankItem, setBankList);
    };

    const readBankBank = (id: number): IBankBank => {
        return readItem(id, bankList) as IBankBank;
    };

    const listBankBanks = (): IBankBank[] => {
        return listItems(bankList) as IBankBank[];
    };

    const listBankBankNames = (): INameItem[] => {
        return listItemNames(bankList);
    };

    //  Bank Accounts --------------------------------------------------------

    const createBankAccount = (createdAccount: IBankAccount): void => {
        createItem(createdAccount as IBankItem, accountList, setAccountList, compareItems);
    };

    const updateBankAccount = (updatedAccount: IBankAccount): void => {
        updateItem(updatedAccount as IBankItem, setAccountList, compareItems);
    };

    const deleteBankAccount = (deletedAccount: IBankAccount): void => {
        deleteItem(deletedAccount as IBankItem, setAccountList);
    };

    const readBankAccount = (id: number): IBankAccount => {
        return readItem(id, accountList) as IBankAccount;
    };

    const listBankAccounts = (parentBank?: IBankBank): IBankAccount[] => {
        return listItems(accountList, "bankId", parentBank as IBankItem) as IBankAccount[];
    };

    const listBankAccountNames = (): INameItem[] => {
        const context = `${module}.${listBankAccountNames.name}`
        const names = listItemNames(accountList);
        logger.debug(category, context, 'names =', names);
        return names;
    };

    return {
        loadBankData,
        saveBankData,

        createBankBank,
        updateBankBank,
        deleteBankBank,
        readBankBank,
        listBankBanks,
        listBankBankNames,

        createBankAccount,
        updateBankAccount,
        deleteBankAccount,
        readBankAccount,
        listBankAccounts,
        listBankAccountNames,
    };
}
