
import ICommonModeViewModel from "./ICommonModeViewModel";

export default interface ICommonDetailsViewModel extends ICommonModeViewModel {
    showDetails: boolean;
    showButtons: boolean;
    showOKButton: boolean;
}
