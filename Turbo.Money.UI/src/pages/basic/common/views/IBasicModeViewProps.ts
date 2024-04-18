import { ReactNode } from "react";

import IStyledViewProps from "common/views/IStyledViewProps";

export default interface IBasicModeViewProps extends IStyledViewProps {
    children?: ReactNode;
}
