import axios from "../../axios/AxiosCommon";

function BudgetDataService() {

    const createSampleData = () => {
        return axios.post(`/budget/create_sample_data`);
    };

    return {
        createSampleData,
    };
};

export default BudgetDataService();