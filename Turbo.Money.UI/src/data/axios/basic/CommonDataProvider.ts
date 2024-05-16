
import IDataProviderResponse from "common/data/IDataProviderResponse";
import IModelItem from "common/models/IModelItem";

import IBasicDataProvider from "data/interfaces/basic/IBasicDataProvider";

import axios from "../AxiosCommon";

export default function CommonDataProvider<EntityT>(api: string): IBasicDataProvider<EntityT> {

    const create = async (data: object): Promise<IDataProviderResponse<EntityT>> => {
        return await axios.post(`/${api}`, data);
    };

    const get = async (id: number): Promise<IDataProviderResponse<EntityT>> => {
        return await axios.get(`/${api}/${id}`);
    };

    const getAll = async (): Promise<IDataProviderResponse<EntityT[]>> => {
        return await axios.get(`/${api}/all`);
    };

    const getList = async (): Promise<IDataProviderResponse<IModelItem[]>> => {
        return await axios.get(`/${api}/list`);
    };

    const update = async (id: number, data: object): Promise<IDataProviderResponse<EntityT>> => {
        return await axios.put(`/${api}/${id}`, data);
    };

    const remove = async (id: number): Promise<IDataProviderResponse<EntityT>> => {
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
