import React, { useEffect, useRef, useState } from "react";

const Link = require("react-router-dom").Link;

function Div({ children, ...props }) {
    return (
        <div {...props}>
            {children}
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

        if (item.content === "Back") {
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
        <>
            <div
                ref={divRef}
                className="tb-navbar-side bi-list"
                onClick={handleMainClick}
                data-value="main"
            >
                {list && (
                    <div className="tb-navbar-side-dropdown-content">
                        {list.map(item => {
                            const Element = ("to" in item) ? Link : Div;
                            let content = ("lst" in item) ? item.content + " +" : item.content;

                            let iconClass = "";
                            if ("list" in item)
                                iconClass = "bi-caret-right-fill";
                            if (("to" in item) && (typeof item.content === 'string'))
                                iconClass = "bi-record-fill";
                            if (content === "Back")
                                iconClass = "bi-caret-left-fill";

                            return (
                                <Element
                                    className={`tb-navbar-side-item`}
                                    to={item.to}
                                    key={content}
                                    onClick={() => handleItemClick(item)}
                                    data-value="item"
                                >
                                    <span className={iconClass} />
                                    {content}
                                </Element>
                            );
                        })}
                    </div>
                )}
            </div>
        </>
    );
}

export default NavBarSide;
