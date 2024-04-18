
import IModelItem from "common/models/IModelItem";

export default interface IBankAccount extends IModelItem {
    description: string;
    number: string;
    bankId: number;
}
