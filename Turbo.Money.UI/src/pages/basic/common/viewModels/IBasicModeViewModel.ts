
import IModelItem from "common/models/IModelItem";

export default interface IBasicModeViewModel {
    title: string;
    entity: string;
    mode: string;
    submitText: string;
    item: null | IModelItem;

    canSubmit: boolean;
    canCancel: boolean;

    submit: () => void;
    cancel: () => void;
}
