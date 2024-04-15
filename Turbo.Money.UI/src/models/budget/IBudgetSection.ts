import ICommonItem from "../common/ICommonItem";

export default interface IBudgetSection extends ICommonItem {
    description: string;
    direction: string;
}
