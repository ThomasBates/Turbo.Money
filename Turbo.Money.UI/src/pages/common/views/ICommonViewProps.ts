import ICommonModeViews from "./ICommonModeViews";
import IStyledFactoryViewProps from "./IStyledFactoryViewProps";

export default interface ICommonViewProps extends IStyledFactoryViewProps {
    modeViews: ICommonModeViews;
}
