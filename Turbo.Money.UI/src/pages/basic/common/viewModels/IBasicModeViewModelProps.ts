
import IModelItem from "common/models/IModelItem";

export default interface IBasicModeViewModelProps {
    title: string;
    entity: string;
    mode: string;
    item: IModelItem | null;

    list?: IModelItem[];
    parentList?: IModelItem[];

    setItem?: (item: IModelItem) => void;
    onSubmitted?: (item: IModelItem) => void;
    onCancelled?: (item: IModelItem) => void;

    //[key: string]: any;
}