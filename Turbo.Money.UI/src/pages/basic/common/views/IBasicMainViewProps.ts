import { ReactNode } from "react";


import ICommonStyle from "common/views/ICommonStyle";
import IFactoryViewProps from "common/views/IFactoryViewProps";
import IStyledViewProps from "common/views/IStyledViewProps";

import IBasicModeViews from "./IBasicModeViews";
import IBasicListItemProps from "./IBasicListItemProps";

export default interface IBasicMainViewProps extends IFactoryViewProps {
    modeViews: IBasicModeViews;
    customStyle?: ICommonStyle;
    CustomListHeader?: (props: IStyledViewProps) => ReactNode;
    CustomTableHeader?: (props: IStyledViewProps) => ReactNode;
    CustomListItem?: (props: IBasicListItemProps) => ReactNode;
    CustomTableFooter?: (props: IStyledViewProps) => ReactNode;
    CustomListFooter?: (props: IStyledViewProps) => ReactNode;
}
