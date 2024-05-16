
import IDataProviderResponse from "common/data/IDataProviderResponse";

import axios from "data/axios/AxiosCommon";
import IBankDataProvider from "data/interfaces/services/IBankDataProvider";

export default function BankDataProvider(): IBankDataProvider {

    const createSampleData = async (): Promise<IDataProviderResponse<object>> => {
        return await axios.post(`/bank/create_sample_data`);
    };

    return {
        createSampleData,
    };
}
