
import ICommonItem from "../common/ICommonItem";

export default interface IBudgetCategory extends ICommonItem {
    description: string;
    sectionId: number;
}
