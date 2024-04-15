
import ICommonModeViewModel from "./ICommonModeViewModel";

export default interface ICommonEditViewModel extends ICommonModeViewModel{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setProperty(name: string, value: any): void; 
}
