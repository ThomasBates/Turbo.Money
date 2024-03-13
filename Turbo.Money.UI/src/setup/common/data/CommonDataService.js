import axios from "../../../axios/AxiosCommon";

const CommonDataService = (api) => {

    const create = data => {
        return axios.post(`/${api}`, data);
    };

    const get = id => {
        return axios.get(`/${api}/${id}`);
    };

    const getAll = () => {
        return axios.get(`/${api}/all`);
    };

    const getList = () => {
        return axios.get(`/${api}/list`);
    };

    const update = (id, data) => {
        return axios.put(`/${api}/${id}`, data);
    };

    const remove = id => {
        return axios.delete(`/${api}/${id}`);
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
