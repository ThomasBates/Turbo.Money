
import IModelItem from "common/models/IModelItem";

export default interface IBankBank extends IModelItem{
    description: string;
    number: string;
    branch: string;
}
