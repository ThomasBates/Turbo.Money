import { ReactNode } from "react";
import IStyledViewProps from "./IStyledViewProps";

export default interface ICommonModeViewProps extends IStyledViewProps {
    children?: ReactNode;
}
