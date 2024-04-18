
import IBasicModeViewModel from "./IBasicModeViewModel";

export default interface IBasicDetailsViewModel extends IBasicModeViewModel {

    notSelected: string;
    showDetails: boolean;
    showButtons: boolean;
    showOKButton: boolean;
}
