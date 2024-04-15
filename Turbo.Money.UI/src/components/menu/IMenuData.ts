
export interface IMenuDataBack {
    content: string;
    backList: IMenuDataItem[];
}

export interface IMenuDataLink {
    content: string;
    icon?: string;
    disabledIcon?: string;
    to?: string;
    action?: () => void;
}

export interface IMenuDataList {
    content: string;
    width: number;
    icon?: string;
    disabledIcon?: string;
    list: IMenuDataItem[];
}

export interface IMenuDataText {
    content: string;
    icon?: string;
}

export type IMenuDataItem = IMenuDataBack | IMenuDataLink | IMenuDataList | IMenuDataText;

export interface IMenuData {
    content: string;
    minWidth?: string;
    icon?: string;
    list: IMenuDataItem[];
}
