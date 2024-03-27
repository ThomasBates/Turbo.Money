import axios from "../../axios/AxiosCommon";

function BankDataService() {

    const createSampleData = () => {
        return axios.post(`/bank/create_sample_data`);
    };

    return {
        createSampleData,
    };
};

export default BankDataService();