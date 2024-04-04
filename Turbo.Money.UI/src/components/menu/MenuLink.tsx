import React from "react";
import { useNavigate } from "react-router-dom";

export default function MenuLink({ style, item, onItemSelected }) {
    const navigate = useNavigate();
    const isText = (typeof item.content === 'string');
    const enabled = !("enabled" in item) || item.enabled;
    const className = isText ? (enabled ? style.item : style.disabled_item) : style.logo;

    const icon = !isText ? "" : enabled
        ? (item.icon || (<img src="/assets/icons/menu/link.png" alt="Link" width="16" />))
        : (item.disabledIcon || (<img src="/assets/icons/menu/disabled.png" alt="Link" width="16" />));

    const handleClick = () => {
        const enabled = !("enabled" in item) || item.enabled;
        if (!enabled) {
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
            key={item.content}
            onClick={handleClick}
            data-value={item.content}
        >
            {/*<span className={iconClass} />{item.content}*/}
            <span className={style.link_icon}>{icon}</span>
            <span className={style.link_content}>{item.content}</span>
        </div>
    );
}
