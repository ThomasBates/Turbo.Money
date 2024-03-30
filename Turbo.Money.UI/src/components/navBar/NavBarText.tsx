import React from "react";

export default function NavBarText({ style, item }) {

    if (item.content === "---") {
        return (
            <div
                className={style.divider}
                key={item}
                data-value={item.content}
            />
        );
    }

    const isText = (typeof item.content === 'string');
    const className = isText ? style.text : style.logo;
    const iconClass = isText ? "bi-dot " + style.text_icon_color : "";

    return (
        <div
            className={className}
            key={item.content}
            data-value={item.content}
        >
            <span className={iconClass} />{item.content}
        </div>
    );
}
