import http from "../../../AxiosCommon";

export default () => {
    const api = "budgetWorksheet";

    const getAll = () => {
        return http.get(`/${api}`);
    };

    return {
        getAll
    };
};

