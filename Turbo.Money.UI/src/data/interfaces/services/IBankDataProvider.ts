
import IDataProviderResponse from "common/data/IDataProviderResponse";

export default interface IBankDataProvider {
    createSampleData(): Promise<IDataProviderResponse<object>>;
}
