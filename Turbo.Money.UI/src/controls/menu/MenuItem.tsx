
import ICommonStyle from "common/views/ICommonStyle";

import { IMenuDataItem } from "./IMenuData";
import MenuList from "./MenuList";
import MenuBack from "./MenuBack";
import MenuLink from "./MenuLink";
import MenuText from "./MenuText";

interface IProps {
    style: ICommonStyle;
    item: IMenuDataItem;
    top: boolean;
    hover: boolean;
    wide: boolean;
    onListSelected: null | ((item: IMenuDataItem | null) => void);
    onItemSelected: null | ((item: IMenuDataItem) => void);
}

export default function MenuItem({ style, item, top, hover, wide, onListSelected, onItemSelected }: IProps) {
    if ("list" in item)
        return (
            <MenuList
                style={style}
                item={item}
                top={top}
                hover={hover}
                wide={wide}
                onListSelected={onListSelected}
                onItemSelected={onItemSelected} />
        );
    else if ("backList" in item)
        return (
            <MenuBack
                style={style}
                item={item}
                onListSelected={onListSelected} />
        );
    else if (("action" in item) || ("to" in item))
        return (
            <MenuLink
                style={style}
                item={item}
                onItemSelected={onItemSelected} />
        );
    else
        return (
            <MenuText
                style={style}
                item={item} />
        );
}
