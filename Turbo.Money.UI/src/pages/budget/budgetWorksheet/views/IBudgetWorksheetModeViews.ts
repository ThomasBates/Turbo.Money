
import IViewProps from 'pages/common/views/IViewProps';

export default interface IBudgetWorksheetModeViews {
    add: (props: IViewProps) => JSX.Element;
    edit: (props: IViewProps) => JSX.Element;
    delete: (props: IViewProps) => JSX.Element;
    show: (props: IViewProps) => JSX.Element;

    [key: string]: (props: IViewProps) => JSX.Element;
}
