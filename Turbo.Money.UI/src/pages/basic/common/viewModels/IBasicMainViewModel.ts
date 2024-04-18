
import IModelItem from "common/models/IModelItem";

import IBasicModeViewModel from "./IBasicModeViewModel";

export default interface IBasicMainViewModel {
    title: string;
    list: IModelItem[];
    selectedIndex: number | null;
    mode: string;
    modeViewModel: IBasicModeViewModel;

    canSelectItem: boolean;
    canAddItem: boolean;
    canEditItem: boolean;
    canDeleteItem: boolean;

    loadData: () => void;
    selectItem: (item: IModelItem | null | undefined) => void;
    addItem: () => void;
    editItem: () => void;
    deleteItem: () => void;
}
