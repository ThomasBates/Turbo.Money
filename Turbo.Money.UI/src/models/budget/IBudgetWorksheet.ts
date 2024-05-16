
import IBudgetAccount from "./IBudgetAccount";
import IBudgetCategory from "./IBudgetCategory";
import IBudgetPeriod from "./IBudgetPeriod";
import IBudgetSection from "./IBudgetSection";

export default interface IBudgetWorksheet {
    period: IBudgetPeriod;
    sectionList: IBudgetSection[];
    categoryList: IBudgetCategory[];
    accountList: IBudgetAccount[];
}
