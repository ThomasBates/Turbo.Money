
import ICommonItem from "models/common/ICommonItem";

export default interface ICommonModeViewModel {
    title: string;
    entity: string;
    mode: string;
    modeText: string;
    item: null | ICommonItem;

    canSubmit: boolean;
    canCancel: boolean;

    submit: () => void;
    cancel: () => void;
}
