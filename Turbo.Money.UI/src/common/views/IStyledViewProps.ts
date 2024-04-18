
import IViewProps from 'common/views/IViewProps';

import ICommonStyle from './ICommonStyle';

export default interface IStyledViewProps extends IViewProps {
    style: ICommonStyle;
}
