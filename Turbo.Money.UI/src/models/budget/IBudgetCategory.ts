
import IModelItem from "common/models/IModelItem";

export default interface IBudgetCategory extends IModelItem {
    description: string;
    sectionId: number;
}
