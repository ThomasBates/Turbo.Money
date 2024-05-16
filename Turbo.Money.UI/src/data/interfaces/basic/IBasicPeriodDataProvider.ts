
import IDataProviderResponse from "common/data/IDataProviderResponse";
import IModelItem from "common/models/IModelItem";

import IBudgetPeriod from "models/budget/IBudgetPeriod";

import IBasicDataProvider from "./IBasicDataProvider";

export default interface IBasicPeriodDataProvider<EntityT> extends IBasicDataProvider<EntityT> {
    createForPeriod(budgetPeriod: IBudgetPeriod, data: object): Promise<IDataProviderResponse<EntityT>>;
    getAllForPeriod(budgetPeriod: IBudgetPeriod): Promise<IDataProviderResponse<EntityT[]>>;
    getListForPeriod(budgetPeriod: IBudgetPeriod): Promise<IDataProviderResponse<IModelItem[]>>;
    getOneForPeriod(budgetPeriod: IBudgetPeriod, id: number): Promise<IDataProviderResponse<EntityT>>;
    updateForPeriod(budgetPeriod: IBudgetPeriod, id: number, data: object): Promise<IDataProviderResponse<EntityT>>;
    removeForPeriod(budgetPeriod: IBudgetPeriod, id: number): Promise<IDataProviderResponse<EntityT>>;
}
