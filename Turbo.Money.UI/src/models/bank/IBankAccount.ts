
import ICommonItem from "../common/ICommonItem";

export default interface IBankAccount extends ICommonItem {
    description: string;
    number: string;
    bankId: number;
}
