
import IStyledViewProps from 'common/views/IStyledViewProps';

export default interface IBankWorksheetModeViews {
    add: (props: IStyledViewProps) => JSX.Element;
    edit: (props: IStyledViewProps) => JSX.Element;
    delete: (props: IStyledViewProps) => JSX.Element;
    show: (props: IStyledViewProps) => JSX.Element;

    [key: string]: (props: IStyledViewProps) => JSX.Element;
}
