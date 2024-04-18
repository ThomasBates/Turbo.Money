
import IModelItem from "common/models/IModelItem";

export default interface IBudgetAccount extends IModelItem {
    description: string;
    categoryId: number;
    amount: string;
    type: string;
    method: string;
}
