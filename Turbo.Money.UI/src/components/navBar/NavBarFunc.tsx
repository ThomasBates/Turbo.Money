import React from "react";
import { useNavigate } from "react-router-dom";

function NavBarLink({ item, onItemSelected }) {
    const navigate = useNavigate();
    const isText = (typeof item.content === 'string');
    const enabled = !("enabled" in item) || item.enabled;
    const className = isText ? (enabled ? "tb-navbar-item" : "tb-navbar-disabled-item") : "tb-navbar-logo";
    const iconClass = (isText ? "bi-record-fill" : "")
        + (enabled ? " tb-navbar-link-icon-color" : " tb-navbar-disabled-icon-color");

    const handleClick = () => {
        const enabled = !("enabled" in item) || item.enabled;
        if (!enabled) {
            return;
        }

        if (onItemSelected) {
            onItemSelected(item);
        }

        item.func();
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

export default NavBarLink;
