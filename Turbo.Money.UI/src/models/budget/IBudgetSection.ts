import IModelItem from "common/models/IModelItem";

export default interface IBudgetSection extends IModelItem {
    description: string;
    direction: string;
}
