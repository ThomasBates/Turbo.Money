import React from "react";
import { useNavigate } from "react-router-dom";

export default function NavBarLink({ style, item, onItemSelected }) {
    const navigate = useNavigate();
    const isText = (typeof item.content === 'string');
    const enabled = !("enabled" in item) || item.enabled;
    const className = isText ? (enabled ? style.item : style.disabled_item) : style.logo;
    //const iconClass = (isText ? "bi-record-fill" : "")
    //    + ` ${enabled ? style.link_icon_color : style.disabled_icon_color}`;

    const icon = !isText ? "" : enabled
        ? (item.icon || (<img src="/assets/icons/icons8-green-circle-48.png" alt="Link" width="24" />))
        : (item.disabledIcon || (<img src="/assets/icons/icons8-red-circle-48.png" alt="Link" width="24" />));

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
