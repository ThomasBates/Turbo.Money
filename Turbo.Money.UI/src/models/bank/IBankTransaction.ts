
export default interface IBankTransaction {
    id: number;

    timeStamp: Date,
    description: string,
    amount: number,
    balance: number,
    sequence: string,

    doubleEntryId: number,
}
