import { getRandomString } from "services/tools/tools";

import { IMenuDataText } from "./IMenuData";
import IMenuStyle, { combineStyles } from "./IMenuStyle";

interface IProps {
    style: IMenuStyle;
    item: IMenuDataText;
}

export default function MenuText({ style, item }: IProps) {

    if (item.content === "---") {
        const dividerClass = combineStyles(style.divider_control, style.divider_theme);
        return (
            <div
                className={dividerClass}
                key={getRandomString(8)}
                data-value={item.content}
            />
        );
    }

    const className = combineStyles(style.text_control, style.text_theme);
    const iconClass = (item.icon && style[item.icon]) || style.text_icon;
    const contentClass = style.text_content;

    return (
        <div
            className={className}
            key={getRandomString(8)}
            data-value={item.content}
        >
            <span className={iconClass} />
            <span className={contentClass}>{item.content}</span>
        </div>
    );
}
