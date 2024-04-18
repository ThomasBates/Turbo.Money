import axios from "data/axios/AxiosCommon";

export default function BudgetDataProvider() {

    const createSampleData = () => {
        return axios.post(`/budget/create_sample_data`);
    };

    return {
        createSampleData,
    };
}
