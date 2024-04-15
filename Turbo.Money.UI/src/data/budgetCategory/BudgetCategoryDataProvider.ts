import CommonDataProvider from "data/axios/CommonDataProvider";

import IBudgetCategory from "models/budget/IBudgetCategory";
import ICommonItem from "models/common/ICommonItem";

export default CommonDataProvider<IBudgetCategory, ICommonItem>("budgetCategory");
