import CommonDataProvider from "data/axios/CommonDataProvider";

import IBudgetAccount from "models/budget/IBudgetAccount";
import ICommonItem from "models/common/ICommonItem";

export default CommonDataProvider<IBudgetAccount, ICommonItem>("budgetAccount");
