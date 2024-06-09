import IModelItem from "common/models/IModelItem";

export default interface IBudgetPeriod extends IModelItem {
    start: string;
    end: string;
    description: string;
    isSandbox: boolean;
    isClosed: boolean;
}
