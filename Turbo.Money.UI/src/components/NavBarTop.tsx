import React, { useEffect, useRef, useState } from "react";

const Link = require("react-router-dom").Link;

function NavBarItem({ item, top, onClick }) {
    if ("list" in item)
        return (<NavBarList item={item} top={top} onClick={onClick} />);
    else if ("to" in item)
        return (<NavBarLink item={item} top={top} onClick={onClick} />);
    else
        return (<NavBarText item={item} top={top} />);
}

function NavBarList({ item, top, onClick }) {
    const [showList, setShowList] = useState(false);

    const handleMouseEnter = () => {
        setShowList(true);
    }

    const handleMouseLeave = () => {
        setShowList(false);
    }

    const handleItemClick = () => {
        setShowList(false);
        onClick();
    }

    const className = top ? "tb-navbar-list-below" : "tb-navbar-list-beside";
    const iconClass = top ? "bi-caret-down-fill" : "bi-caret-right-fill";

    return (
        <div
            className="tb-navbar-item"
            key={item.content}
            data-value="list"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <span className={iconClass} />{item.content}
            {showList && (
                <div
                    className={className}
                >
                    {item.list.map(item => (
                        <NavBarItem item={item} top={false} key={item.content} onClick={handleItemClick} />
                    ))}
                </div>
            )}
        </div>
    );
}

function NavBarLink({ item, top, onClick }) {
    const isText = (typeof item.content === 'string');
    const className = isText ? "tb-navbar-item" : "tb-navbar-logo";
    const iconClass = isText ? "bi-record-fill" : "";

    return (
        <Link
            className={className}
            to={item.to}
            key={item.content}
            onClick={() => onClick()}
            data-value="item"
        >
            <span className={iconClass} />{item.content}
        </Link>
    );

}

function NavBarText({ item, top }) {
    const isText = (typeof item.content !== 'string');
    const className = isText ? "tb-navbar-item" : "tb-navbar-logo";
    const iconClass = isText ? "" : "";

    return (
        <div
            className={className}
            key={item.content}
            data-value="item"
        >
            <span className={iconClass} />{item.content}
        </div>
    );
}

function NavBarTop({ data }) {
    return (
        <nav className="tb-navbar">
            {data.map(item => (
                <NavBarItem item={item} top={true} key={item.content} onClick={() => { }} />
            ))}
        </nav>
    );
}

export default NavBarTop;
