
export default interface IBankAccountPeriod {
    id: number;

    periodId: number;
    accountId: number;

    openingBalance: number;
    closingBalance: number;
}
