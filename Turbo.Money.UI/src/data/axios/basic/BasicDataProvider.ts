
import IModelItem from "common/models/IModelItem";

import IBasicDataProvider from "data/interfaces/basic/IBasicDataProvider";
import IBasicDataProviderResponse from "data/interfaces/basic/IBasicDataProviderResponse";

import axios from "../AxiosCommon";

export default function BasicDataProvider<EntityT>(api: string): IBasicDataProvider<EntityT> {

    const create = async (data: object): Promise<IBasicDataProviderResponse<EntityT>> => {
        return await axios.post(`/${api}`, data);
    };

    const get = async (id: number): Promise<IBasicDataProviderResponse<EntityT>> => {
        return await axios.get(`/${api}/${id}`);
    };

    const getAll = async (): Promise<IBasicDataProviderResponse<EntityT[]>> => {
        return await axios.get(`/${api}/all`);
    };

    const getList = async (): Promise<IBasicDataProviderResponse<IModelItem[]>> => {
        return await axios.get(`/${api}/list`);
    };

    const update = async (id: number, data: object): Promise<IBasicDataProviderResponse<EntityT>> => {
        return await axios.put(`/${api}/${id}`, data);
    };

    const remove = async (id: number): Promise<IBasicDataProviderResponse<EntityT>> => {
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
