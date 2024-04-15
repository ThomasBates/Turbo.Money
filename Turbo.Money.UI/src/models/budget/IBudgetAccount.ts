
import ICommonItem from "../common/ICommonItem";

export default interface IBudgetAccount extends ICommonItem {
    description: string;
    categoryId: number;
    amount: string;
    type: string;
    method: string;
}
