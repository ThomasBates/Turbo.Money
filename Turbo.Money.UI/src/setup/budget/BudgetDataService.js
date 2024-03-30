import axios from "../../axios/AxiosCommon";

export default function BudgetDataService() {

    const createSampleData = () => {
        return axios.post(`/budget/create_sample_data`);
    };

    return {
        createSampleData,
    };
};
