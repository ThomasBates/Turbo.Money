import IModelItem from "common/models/IModelItem";

export default interface IBudgetPeriod extends IModelItem {
    start: Date;
    end: Date;
    description: string;
    isSandbox: boolean;
    isSealed: boolean;
}
