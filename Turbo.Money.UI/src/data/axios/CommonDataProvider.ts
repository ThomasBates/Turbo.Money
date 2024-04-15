
import ICommonDataProvider from "data/common/ICommonDataProvider";
import ICommonDataProviderResponse from "data/common/ICommonDataProviderResponse";

import axios from "./AxiosCommon";

export default function CommonDataProvider<EntityT, ListT>(api: string): ICommonDataProvider<EntityT, ListT> {

    const create = async (data: object): Promise<ICommonDataProviderResponse<EntityT>> => {
        return await axios.post(`/${api}`, data);
    };

    const get = async (id: number): Promise<ICommonDataProviderResponse<EntityT>> => {
        return await axios.get(`/${api}/${id}`);
    };

    const getAll = async (): Promise<ICommonDataProviderResponse<EntityT[]>> => {
        return await axios.get(`/${api}/all`);
    };

    const getList = async (): Promise<ICommonDataProviderResponse<ListT[]>> => {
        return await axios.get(`/${api}/list`);
    };

    const update = async (id: number, data: object): Promise<ICommonDataProviderResponse<EntityT>> => {
        return await axios.put(`/${api}/${id}`, data);
    };

    const remove = async (id: number): Promise<ICommonDataProviderResponse<EntityT>> => {
        return await axios.delete(`/${api}/${id}`);
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
