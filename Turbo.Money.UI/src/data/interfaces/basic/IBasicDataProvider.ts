
import IDataProviderResponse from "common/data/IDataProviderResponse";
import IModelItem from "common/models/IModelItem";

export default interface IBasicDataProvider<EntityT> {
    create: (data: object) => Promise<IDataProviderResponse<EntityT>>;
    get: (id: number) => Promise<IDataProviderResponse<EntityT>>;
    getAll: () => Promise<IDataProviderResponse<EntityT[]>>;
    getList: () => Promise<IDataProviderResponse<IModelItem[]>>;
    update: (id: number, data: object) => Promise<IDataProviderResponse<EntityT>>;
    remove: (id: number) => Promise<IDataProviderResponse<EntityT>>;
}
