import React, { useEffect, useRef, useState } from "react";

const Link = require("react-router-dom").Link;

function NavBarItem({ item, onClick }) {
    let iconClass = "";
    if ("list" in item)
        iconClass = "bi-caret-right-fill";
    if (("to" in item) && (typeof item.content === 'string'))
        iconClass = "bi-record-fill";
    if ("backList" in item)
        iconClass = "bi-caret-left-fill";

    return ("to" in item) ? (
        <Link
            className={`tb-navbar-side-item`}
            to={item.to}
            key={item.content}
            onClick={() => onClick(item)}
            data-value="item"
        >
            <span className={iconClass} />{item.content}
        </Link>
    ) : (
        <div
            className={`tb-navbar-side-item`}
            key={item.content}
            onClick={() => onClick(item)}
            data-value="item"
        >
            <span className={iconClass} />{item.content}
        </div>
    );

}

function NavBarSide({ data }) {
    const [list, _setList] = useState(null);
    const listRef = useRef(list);
    const divRef = useRef(null);

    const setList = list => {
        listRef.current = list;
        _setList(list);
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleMouseDown);
    }, [divRef]);

    const handleMouseDown = (e) => {
        if (listRef.current && !divRef.current?.contains(e.target)) {
            setList(null);
        }
    }

    const handleMainClick = (e) => {
        e.preventDefault();
        let dataValue = (e.target as HTMLElement).getAttribute('data-value');
        if (dataValue !== 'main') {
            return;
        };

        if (!list) {
            setList(data);
        }
        else {
            setList(null);
        }
    }

    const handleItemClick = (item) => {
        if ("to" in item) {
            setList(null);
            return;
        }

        if ("backList" in item) {
            setList(item.backList);
            return;
        }

        if ("list" in item) {
            setList([
                {
                    content: "Back",
                    backList: list
                },
                ...item.list
            ]);
            return;
        }
    }

    return (
        <nav
            ref={divRef}
            className="tb-navbar-side bi-list"
            onClick={handleMainClick}
            data-value="main"
        >
            {list && (
                <div className="tb-navbar-side-list">
                    {list.map(item => (
                        <NavBarItem item={item} onClick={handleItemClick} />
                    ))}
                </div>
            )}
        </nav>
    );
}

export default NavBarSide;
