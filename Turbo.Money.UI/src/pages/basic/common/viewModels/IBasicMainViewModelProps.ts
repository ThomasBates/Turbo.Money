
import IModelItem from "common/models/IModelItem";

import IBasicDataProvider from "data/interfaces/basic/IBasicDataProvider";

import IBasicDetailsViewModel from "./IBasicDetailsViewModel";
import IBasicEditViewModel from "./IBasicEditViewModel";
import IBasicModeViewModelProps from "./IBasicModeViewModelProps";

export default interface IBasicMainViewModelProps {
    title: string;
    modeTitle: string;
    entity: string;

    dataProvider: IBasicDataProvider<IModelItem, IModelItem>,
    initialItem: IModelItem,

    detailsViewModel: (props: IBasicModeViewModelProps) => IBasicDetailsViewModel,
    editViewModel: (props: IBasicModeViewModelProps) => IBasicEditViewModel
}