
import ICommonModeViewModel from "./ICommonModeViewModel";

export default interface ICommonEditViewModel extends ICommonModeViewModel{
    setProperty(name: string, value: string | string[] | number): void; 
}
