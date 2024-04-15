
import ICommonItem from "../common/ICommonItem";

export default interface IBankBank extends ICommonItem{
    description: string;
    number: string;
    branch: string;
}
