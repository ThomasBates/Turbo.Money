
import ICommonItem from "models/common/ICommonItem";

import ICommonModeViewModel from "./ICommonModeViewModel";

export default interface ICommonViewModel {
    title: string;
    list: ICommonItem[];
    selectedIndex: number | null;
    mode: string;
    modeViewModel: ICommonModeViewModel;

    canSelectItem: boolean;
    canAddItem: boolean;
    canEditItem: boolean;
    canDeleteItem: boolean;

    loadData: () => void;
    selectItem: (item: ICommonItem | null | undefined) => void;
    addItem: () => void;
    editItem: () => void;
    deleteItem: () => void;
}
