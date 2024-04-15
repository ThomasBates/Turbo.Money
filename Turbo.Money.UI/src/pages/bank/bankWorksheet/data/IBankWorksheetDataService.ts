
import IBankAccount from 'models/bank/IBankAccount';
import IBankBank from 'models/bank/IBankBank';

export interface IBankItem {
    // common
    id: number;
    name: string;
    description?: string;
    state?: string;
    [key: string]: string | number | undefined;

    // bank
    number?: string;
    branch?: string;

    // account
    //number: string;
    bankId?: number;

}

export interface INameItem {
    id: number;
    name: string;
}

export interface IBankWorksheetDataService {

    loadBankData: () => Promise<void>;
    saveBankData: () => Promise<void>;

    createBankBank: (item: IBankBank) => void;
    updateBankBank: (item: IBankBank) => void;
    deleteBankBank: (item: IBankBank) => void;
    readBankBank: (id: number) => IBankBank;
    listBankBanks: () => IBankBank[];
    listBankBankNames: () => INameItem[];

    createBankAccount: (item: IBankAccount) => void;
    updateBankAccount: (item: IBankAccount) => void;
    deleteBankAccount: (item: IBankAccount) => void;
    readBankAccount: (id: number) => IBankAccount;
    listBankAccounts: (parentBank?: IBankBank) => IBankAccount[];
    listBankAccountNames: () => INameItem[];
}

