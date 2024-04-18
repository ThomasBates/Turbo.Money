import axios from "data/axios/AxiosCommon";

export default function BankDataProvider() {

    const createSampleData = () => {
        return axios.post(`/bank/create_sample_data`);
    };

    return {
        createSampleData,
    };
}
