import http from "../../../axios/AxiosCommon";

const CommonDataService = (api) => {

    const create = data => {
        return http.post(`/${api}`, data);
    };

    const get = id => {
        return http.get(`/${api}/${id}`);
    };

    const getAll = () => {
        return http.get(`/${api}/all`);
    };

    const getList = () => {
        return http.get(`/${api}/list`);
    };

    const update = (id, data) => {
        return http.put(`/${api}/${id}`, data);
    };

    const remove = id => {
        return http.delete(`/${api}/${id}`);
    };

    return {
        create,
        get,
        getAll,
        getList,
        update,
        remove
    };
};

export default CommonDataService;
