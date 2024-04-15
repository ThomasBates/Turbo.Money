
import IBankWorksheetAccountViewModel from './IBankWorksheetAccountViewModel';

export default interface IBankWorksheetBankViewModel {
    name: string;
    number: string;
    description: string;

    accountViewModels: IBankWorksheetAccountViewModel[];

    showBank: () => void;
    editBank: () => void;
    deleteBank: () => void;

    addAccount: () => void;
}
