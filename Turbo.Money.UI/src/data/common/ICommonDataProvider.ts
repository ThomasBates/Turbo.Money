import ICommonDataProviderResponse from "./ICommonDataProviderResponse";

export default interface ICommonDataProvider<EntityT, ListT> {
    create(data: object): Promise<ICommonDataProviderResponse<EntityT>>;
    get(id: number): Promise<ICommonDataProviderResponse<EntityT>>;
    getAll(): Promise<ICommonDataProviderResponse<EntityT[]>>;
    getList(): Promise<ICommonDataProviderResponse<ListT[]>>;
    update(id: number, data: object): Promise<ICommonDataProviderResponse<EntityT>>;
    remove(id: number): Promise<ICommonDataProviderResponse<EntityT>>;
}
