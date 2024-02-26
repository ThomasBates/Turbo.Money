import React from "react";

function NavBarText({ item }) {

    if (item.content === "---") {
        return (
            <div
                className="tb-navbar-divider"
                key={item}
                data-value={item.content}
            />
        );
    }

    const isText = (typeof item.content === 'string');
    const className = isText ? "tb-navbar-text" : "tb-navbar-logo";
    const iconClass = isText ? "bi-dot tb-navbar-text-icon-color" : "";

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

export default NavBarText;
