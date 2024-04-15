import ICommonModeViews from "./ICommonModeViews";
import IViewFactoryProps from "./IViewFactoryProps";

export default interface ICommonViewProps extends IViewFactoryProps {
    modeViews: ICommonModeViews;
}
