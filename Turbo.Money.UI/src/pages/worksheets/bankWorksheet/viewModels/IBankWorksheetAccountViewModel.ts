
export default interface IBankWorksheetAccountViewModel {
    name: string;
    number: string;
    description: string;

    showAccount: () => void;
    editAccount: () => void;
    deleteAccount: () => void;
}
