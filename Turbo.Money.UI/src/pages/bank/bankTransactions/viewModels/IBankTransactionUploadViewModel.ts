
export default interface IBankTransactionUploadViewModel {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleFileChanged: (event: any) => void;
    canSubmit: boolean;
    submit: () => void;
}
