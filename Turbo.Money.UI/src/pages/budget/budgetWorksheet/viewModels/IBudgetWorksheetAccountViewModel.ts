
export default interface IBudgetWorksheetAccountViewModel {
    name: string;
    description: string;
    amount: string;
    typeName: string;
    method: string;

    showAccount: () => void;
    editAccount: () => void;
    deleteAccount: () => void;
}
