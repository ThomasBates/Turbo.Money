
import IBasicMainViewModel from "../../common/viewModels/IBasicMainViewModel";

export default interface IBudgetPeriodMainViewModel extends IBasicMainViewModel {

    isSandbox: boolean;
    isClosed: boolean;

    canLoadSandbox: boolean;
    canLoadOpen: boolean;
    canLoadClosed: boolean;

    loadSandbox: () => void;
    loadOpen: () => void;
    loadClosed: () => void;
}
