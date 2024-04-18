
export default interface IBankTransactionUploadViewModel {
    setFile: (file: File | null) => void;
    canSubmit: boolean;
    submit: () => void;
}
