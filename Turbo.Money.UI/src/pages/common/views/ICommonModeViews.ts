import IStyledViewProps from './IStyledViewProps';

export default interface ICommonModeViews {
    details: (props: IStyledViewProps) => JSX.Element;
    add: (props: IStyledViewProps) => JSX.Element;
    edit: (props: IStyledViewProps) => JSX.Element;
    delete: (props: IStyledViewProps) => JSX.Element;
    none: (props: IStyledViewProps) => JSX.Element;

    [key: string]: (props: IStyledViewProps) => JSX.Element;
}
