
import ICommonStyle from "common/views/ICommonStyle";

import { combineStyles, getRandomString } from "services/tools/tools";

import { IMenuDataBack, IMenuDataItem } from "./IMenuData";

interface IProps {
    style: ICommonStyle;
    item: IMenuDataBack;
    onListSelected: null | ((item: IMenuDataItem | null) => void);
}

export default function MenuBack({ style, item, onListSelected }: IProps) {
    const className = combineStyles(style.item_control, style.item_theme);
    const iconClass = style.back_icon;
    const contentClass = style.back_content;

    const handleClick = () => {
        if (onListSelected) {
            onListSelected(item);
        }
    }

    return (
        <div
            className={className}
            key={getRandomString(8)}
            onClick={handleClick}
            data-value={item.content}
        >
            <span className={iconClass} />
            <span className={contentClass}>{item.content}</span>
        </div>
    );
}
