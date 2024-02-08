import React from "react";

function NavBarBack({ item, onListSelected }) {
    const isText = (typeof item.content === 'string');
    const className = isText ? "tb-navbar-item" : "tb-navbar-logo";
    const iconClass = isText ? "bi-caret-left-fill tb-navbar-back-icon-color" : "";

    const handleClick = () => {
        if (onListSelected) {
            onListSelected(item);
        }
    }

    return (
        <div
            className={className}
            key={item.content}
            onClick={handleClick}
            data-value={item.content}
        >
            <span className={iconClass} />{item.content}
        </div>
    );
}

export default NavBarBack;
