
import ICommonDataProvider from "data/common/ICommonDataProvider";

import ICommonItem from "models/common/ICommonItem";

import ICommonDetailsViewModel from "./ICommonDetailsViewModel";
import ICommonEditViewModel from "./ICommonEditViewModel";
import ICommonModeViewModelProps from "./ICommonModeViewModelProps";

export default interface ICommonViewModelProps {
    title: string;
    modeTitle: string;
    entity: string;

    dataProvider: ICommonDataProvider<ICommonItem, ICommonItem>,
    initialItem: ICommonItem,

    detailsViewModel: (props: ICommonModeViewModelProps) => ICommonDetailsViewModel,
    editViewModel: (props: ICommonModeViewModelProps) => ICommonEditViewModel
}