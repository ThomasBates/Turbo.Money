
import IModelItem from "common/models/IModelItem";

import IBasicDataProviderResponse from "./IBasicDataProviderResponse";

export default interface IBasicDataProvider<EntityT> {
    create(data: object): Promise<IBasicDataProviderResponse<EntityT>>;
    get(id: number): Promise<IBasicDataProviderResponse<EntityT>>;
    getAll(): Promise<IBasicDataProviderResponse<EntityT[]>>;
    getList(): Promise<IBasicDataProviderResponse<IModelItem[]>>;
    update(id: number, data: object): Promise<IBasicDataProviderResponse<EntityT>>;
    remove(id: number): Promise<IBasicDataProviderResponse<EntityT>>;
}
