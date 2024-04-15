import IViewProps from './IViewProps';

export default interface ICommonModeViews {
    details: (props: IViewProps) => JSX.Element;
    add: (props: IViewProps) => JSX.Element;
    edit: (props: IViewProps) => JSX.Element;
    delete: (props: IViewProps) => JSX.Element;
    none: (props: IViewProps) => JSX.Element;

    [key: string]: (props: IViewProps) => JSX.Element;
}
