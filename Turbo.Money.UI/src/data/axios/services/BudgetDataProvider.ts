import axios from "data/axios/AxiosCommon";

import IDataProviderResponse from "common/data/IDataProviderResponse";

import IBudgetDataProvider from "data/interfaces/services/IBudgetDataProvider";

import IBudgetPeriod from "models/budget/IBudgetPeriod";
import IBudgetWorksheet from "models/budget/IBudgetWorksheet";

export default function BudgetDataProvider(): IBudgetDataProvider {

    const createSampleData = async (): Promise<IDataProviderResponse<IBudgetPeriod>> => {
        return await axios.post(`/budget/create_sample_data`);
    };

    const getBudgetPeriodList = async (): Promise<IDataProviderResponse<IBudgetPeriod[]>> => {
        return await axios.get(`/budget/period_list`);
    };

    const loadBudgetWorksheet = async (periodId: number): Promise<IDataProviderResponse<IBudgetWorksheet>> => {
        return await axios.get(`/budget/worksheet/${periodId}`);
    };

    const saveBudgetWorksheet = async (worksheet: IBudgetWorksheet): Promise<IDataProviderResponse<IBudgetPeriod>> => {
        return await axios.post(`/budget/worksheet`, worksheet);
    };

    return {
        createSampleData,
        getBudgetPeriodList,
        loadBudgetWorksheet,
        saveBudgetWorksheet,
    };
}
