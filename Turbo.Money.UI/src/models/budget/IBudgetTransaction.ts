
export default interface IBudgetTransaction {
    id: number;

    timeStamp: Date;
    description: string;
    amount: number;
    sequence: string;

    doubleEntryId: number;
    accountId: number;
    bankTransactionId: number;
}
