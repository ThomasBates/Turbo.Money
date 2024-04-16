
import IStyledViewProps from 'pages/common/views/IStyledViewProps';

export default interface IBudgetWorksheetModeViews {
    add: (props: IStyledViewProps) => JSX.Element;
    edit: (props: IStyledViewProps) => JSX.Element;
    delete: (props: IStyledViewProps) => JSX.Element;
    show: (props: IStyledViewProps) => JSX.Element;

    [key: string]: (props: IStyledViewProps) => JSX.Element;
}
