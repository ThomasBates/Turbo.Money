import axios from "../../axios/AxiosCommon";

export default function BankDataService() {

    const createSampleData = () => {
        return axios.post(`/bank/create_sample_data`);
    };

    return {
        createSampleData,
    };
};
