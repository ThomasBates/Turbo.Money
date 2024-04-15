import CommonDataProvider from "data/axios/CommonDataProvider";

import IBudgetSection from "models/budget/IBudgetSection";
import ICommonItem from "models/common/ICommonItem";

export default CommonDataProvider<IBudgetSection, ICommonItem>("budgetSection");
