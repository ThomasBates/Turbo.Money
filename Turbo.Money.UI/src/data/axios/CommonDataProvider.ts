/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "./AxiosCommon";

export default function CommonDataProvider(api: string) {

    const create = (data: any) => {
        return axios.post(`/${api}`, data);
    };

    const get = (id: number) => {
        return axios.get(`/${api}/${id}`);
    };

    const getAll = () => {
        return axios.get(`/${api}/all`);
    };

    const getList = () => {
        return axios.get(`/${api}/list`);
    };

    const update = (id: number, data: any) => {
        return axios.put(`/${api}/${id}`, data);
    };

    const remove = (id: number) => {
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
}
