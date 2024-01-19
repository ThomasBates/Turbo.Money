import http from "../../../AxiosCommon";

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