import http from "../../../axios/AxiosCommon";

const BudgetWorksheetDataProvider = () => {
    const api = "budgetWorksheet";

    const getAll = () => {
        return http.get(`/${api}`);
    };

    return {
        getAll
    };
};

export default BudgetWorksheetDataProvider;