
import IDataProviderResponse from "common/data/IDataProviderResponse";

import IBudgetPeriod from "models/budget/IBudgetPeriod";
import IBudgetWorksheet from "models/budget/IBudgetWorksheet";

export default interface IBudgetDataProvider {
    createSampleData(): Promise<IDataProviderResponse<IBudgetPeriod>>;
    getBudgetPeriodList(): Promise<IDataProviderResponse<IBudgetPeriod[]>>;
    loadBudgetWorksheet(periodId: number): Promise<IDataProviderResponse<IBudgetWorksheet>>;
    saveBudgetWorksheet(worksheet: IBudgetWorksheet): Promise<IDataProviderResponse<IBudgetPeriod>>;
}
