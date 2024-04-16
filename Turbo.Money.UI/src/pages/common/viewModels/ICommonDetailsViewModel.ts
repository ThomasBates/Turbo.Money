
import ICommonModeViewModel from "./ICommonModeViewModel";

export default interface ICommonDetailsViewModel extends ICommonModeViewModel {

    notSelected: string;
    showDetails: boolean;
    showButtons: boolean;
    showOKButton: boolean;
}
