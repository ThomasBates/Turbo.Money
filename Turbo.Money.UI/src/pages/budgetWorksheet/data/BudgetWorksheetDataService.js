import http from "../../../AxiosCommon";

const BudgetWorksheetDataService = () => {
    const api = "budgetWorksheet";

    const getAll = () => {
        return http.get(`/${api}`);
    };

    return {
        getAll
    };
};

export default BudgetWorksheetDataService;