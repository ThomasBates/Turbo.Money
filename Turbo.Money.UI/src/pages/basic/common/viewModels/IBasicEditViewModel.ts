
import IBasicModeViewModel from "./IBasicModeViewModel";

export default interface IBasicEditViewModel extends IBasicModeViewModel{
    setProperty(name: string, value: string | string[] | number): void; 
}
