
import IModelItem from 'common/models/IModelItem';

import IBankAccount from 'models/bank/IBankAccount';
import IBankBank from 'models/bank/IBankBank';

export default interface IBankWorksheetDataService {

    loadBankData: () => Promise<void>;
    saveBankData: () => Promise<void>;

    createBankBank: (item: IBankBank) => void;
    updateBankBank: (item: IBankBank) => void;
    deleteBankBank: (item: IBankBank) => void;
    readBankBank: (id: number) => IBankBank;
    listBankBanks: () => IBankBank[];
    listBankBankNames: () => IModelItem[];

    createBankAccount: (item: IBankAccount) => void;
    updateBankAccount: (item: IBankAccount) => void;
    deleteBankAccount: (item: IBankAccount) => void;
    readBankAccount: (id: number) => IBankAccount;
    listBankAccounts: (parentBank?: IBankBank) => IBankAccount[];
    listBankAccountNames: () => IModelItem[];
}

