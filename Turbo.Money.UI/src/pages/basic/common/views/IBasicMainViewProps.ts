
import ICommonStyle from "common/views/ICommonStyle";
import IFactoryViewProps from "common/views/IFactoryViewProps";

import IBasicModeViews from "./IBasicModeViews";

export default interface IBasicMainViewProps extends IFactoryViewProps {
    customStyle?: ICommonStyle;
    modeViews: IBasicModeViews;
}
