
import IModelItem from "common/models/IModelItem";

import { BudgetAccountType } from "./BudgetAccountType";

export default interface IBudgetAccount extends IModelItem {
    description: string;
    categoryId: number;
    amount: string;
    type: BudgetAccountType;
    method: string;
}
