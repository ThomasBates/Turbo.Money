
import { useNavigate } from "react-router-dom";

import { combineStyles, getRandomString } from "services/tools/tools";

import { IMenuDataItem, IMenuDataLink } from "./IMenuData";
import IMenuStyle from "./IMenuStyle";

interface IProps {
    style: IMenuStyle;
    item: IMenuDataLink;
    onItemSelected: null | ((item: IMenuDataItem) => void);
}

export default function MenuLink({ style, item, onItemSelected }: IProps) {
    const navigate = useNavigate();

    const isEnabled = !("enabled" in item) || item.enabled;

    const className = isEnabled
        ? combineStyles(style.item_control, style.item_theme)
        : combineStyles(style.disabled_item_control, style.disabled_item_theme);

    const iconClass = item.action
        ? isEnabled
            ? ((item.icon && style[item.icon]) || style.link_action_icon)
            : ((item.disabledIcon && style[item.disabledIcon]) || style.link_disabled_action_icon)
        : isEnabled
            ? ((item.icon && style[item.icon]) || style.link_icon)
            : ((item.disabledIcon && style[item.disabledIcon]) || style.link_disabled_icon);

    const contentClass = isEnabled
        ? style.link_content
        : style.link_disabled_content;

    const handleClick = () => {
        const isEnabled = !("enabled" in item) || item.enabled;
        if (!isEnabled) {
            return;
        }

        if (onItemSelected) {
            onItemSelected(item);
        }

        if (item.action)
            item.action();

        if (item.to)
            navigate(item.to);
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
