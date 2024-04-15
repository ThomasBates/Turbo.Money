
import ICommonItem from "models/common/ICommonItem";

export default interface ICommonModeViewModelProps {
    title: string;
    entity: string;
    mode: string;
    item: ICommonItem | null;

    list?: ICommonItem[];
    parentList?: ICommonItem[];

    setItem?: (item: ICommonItem) => void;
    onSubmitted?: (item: ICommonItem) => void;
    onCancelled?: (item: ICommonItem) => void;

    //[key: string]: any;
}