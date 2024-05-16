
import IDataProviderResponse from "common/data/IDataProviderResponse";
import IModelItem from "common/models/IModelItem";

import IBasicPeriodDataProvider from "data/interfaces/basic/IBasicPeriodDataProvider";

import IBudgetPeriod from "models/budget/IBudgetPeriod";

import axios from "../AxiosCommon";

import CommonDataProvider from "./CommonDataProvider";

export default function CommonPeriodDataProvider<EntityT>(api: string): IBasicPeriodDataProvider<EntityT> {

    const common = CommonDataProvider<EntityT>(api);

    const createForPeriod = async (budgetPeriod: IBudgetPeriod, data: object): Promise<IDataProviderResponse<EntityT>> => {
        return await axios.post(`/${api}/period/${budgetPeriod.id}`, data);
    };

    const getAllForPeriod = async (budgetPeriod: IBudgetPeriod): Promise<IDataProviderResponse<EntityT[]>> => {
        return await axios.get(`/${api}/period/${budgetPeriod.id}/all`);
    };

    const getListForPeriod = async (budgetPeriod: IBudgetPeriod): Promise<IDataProviderResponse<IModelItem[]>> => {
        return await axios.get(`/${api}/period/${budgetPeriod.id}/list`);
    };

    const getOneForPeriod = async (budgetPeriod: IBudgetPeriod, id: number): Promise<IDataProviderResponse<EntityT>> => {
        return await axios.get(`/${api}/period/${budgetPeriod.id}/${id}`);
    };

    const updateForPeriod = async (budgetPeriod: IBudgetPeriod, id: number, data: object): Promise<IDataProviderResponse<EntityT>> => {
        return await axios.put(`/${api}/period/${budgetPeriod.id}/${id}`, data);
    };

    const removeForPeriod = async (budgetPeriod: IBudgetPeriod, id: number): Promise<IDataProviderResponse<EntityT>> => {
        return await axios.delete(`/${api}/period/${budgetPeriod.id}/${id}`);
    };

    return {
        ...common,
        createForPeriod,
        getAllForPeriod,
        getListForPeriod,
        getOneForPeriod,
        updateForPeriod,
        removeForPeriod
    };
}
