import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function NavBarList({ item, top, hover, wide, onListSelected, onItemSelected }) {
    const [showList, setShowList] = useState(false);
    const [listPosition, setListPosition] = useState("");
    const mainRef = useRef(null);

    useEffect(() => {
        if (!hover && wide) {
            document.addEventListener("mousedown", handleMouseDown);
        }
        calcListPosition();
    }, [mainRef]);

    const handleMouseDown = (e) => {
        if (!mainRef.current?.contains(e.target)) {
            setShowList(false);
        }
    }

    const calcListPosition = ()=>{
        if (top) {
            setListPosition("top");
        }
        else if (mainRef && mainRef.current) {
            var mainRect = mainRef.current.getBoundingClientRect();
            const mainLeft = mainRect.left + document.body.scrollLeft;

            if (mainLeft + mainRef.current.offsetWidth + item.width < window.innerWidth) {
                setListPosition("right");
            }
            else if (mainLeft - item.width > 0) {
                setListPosition("left");
            }
            else {
                setListPosition("below");
            }
        }
    }

    const enabled = !("enabled" in item) || item.enabled;

    const handleMouseEnter = () => {
        if (hover & enabled) {
            setShowList(true);
        }
    }

    const handleMouseLeave = () => {
        if (hover) {
            setShowList(false);
        }
    }

    const handleClick = (e) => {
        if (!hover && enabled) {
            e.preventDefault();
            let dataValue = (e.target as HTMLElement).getAttribute('data-value');
            if (dataValue !== item.content) {
                return;
            };

            if (wide) {
                setShowList(prev => !prev);
            }
            else {
                onListSelected(item);
            }
        }
    }

    const handleListSelected = (item) => {
        if (onListSelected) {
            onListSelected(item);
        }
    }

    const handleItemSelected = (item) => {
        setShowList(false);
        if (onListSelected) {
            onListSelected(null);
        }
        if (onItemSelected) {
            onItemSelected(item);
        }
    }

    const isText = (typeof item.content === 'string');
    const isRoot = (item.content === "root");
    const className = isRoot
        ? "tb-navbar-toggle bi-list"
        : !isText
            ? "tb-navbar-logo"
            : enabled
                ? "tb-navbar-item"
                : "tb-navbar-disabled-item";

    let iconClass = "";
    if (isText) {
        iconClass = (top ? "bi-caret-down-fill" : "bi-caret-right-fill")
            + (enabled ? " tb-navbar-list-icon-color" : " tb-navbar-disabled-icon-color");
    }

    const listClass = `tb-navbar-list tb-navbar-list-position-${listPosition} ${isRoot ? "tb-navbar-toggle-restore" : ""}`;

    return (
        <div
            ref={mainRef}
            className={className}
            key={item.content}
            data-value={item.content}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            {!isRoot && (
                <><span className={iconClass} />{item.content}</>
            )}

            {showList && (
                <div
                    className={listClass}
                >
                    {item.list.map(item => (
                        <NavBarItem
                            item={item}
                            top={false}
                            hover={hover}
                            wide={wide}
                            key={item.content}
                            onListSelected={handleListSelected}
                            onItemSelected={handleItemSelected} />
                    ))}
                </div>
            )}
        </div>
    );
}

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
        navigate(item.to);
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
    const className = isText ? "tb-navbar-item" : "tb-navbar-logo";
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

function NavBarItem({ item, top, hover, wide, onListSelected, onItemSelected }) {
    if ("list" in item)
        return (
            <NavBarList
                item={item}
                top={top}
                hover={hover}
                wide={wide}
                onListSelected={onListSelected}
                onItemSelected={onItemSelected} />
        );
    else if ("backList" in item)
        return (
            <NavBarBack
                item={item}
                onListSelected={onListSelected} />
        );
    else if ("to" in item)
        return (
            <NavBarLink
                item={item}
                onItemSelected={onItemSelected} />
        );
    else
        return (
            <NavBarText item={item} />
        );
}

function NavBar({ navData }) {
    // device settings
    const hoverQuery = window.matchMedia(`(hover:hover) and (pointer:fine)`);
    const wideQuery = window.matchMedia(`(min-width: ${navData.minWidth})`);

    let [hover, setHover] = useState(hoverQuery.matches);
    const [wide, setWide] = useState(wideQuery.matches);

    useEffect(() => {
        hoverQuery.addEventListener("change", e => setHover(e.matches));
        wideQuery.addEventListener("change", e => setWide(e.matches));
    }, []);

    //hover = false;

    // in situ one list for !hover and !wide
    const [list, setList] = useState(null);
    const listRef = useRef(null);

    useEffect(() => {
        if (!hover && !wide) {
            document.addEventListener("mousedown", handleMouseDown);
        }
    }, [listRef]);

    const handleMouseDown = (e) => {
        if (!listRef.current?.contains(e.target)) {
            setList(null);
        }
    }

    const handleClick = (e) => {
        e.preventDefault();
        let dataValue = (e.target as HTMLElement).getAttribute('data-value');
        if (dataValue !== "root") {
            return;
        };

        if (!list) {
            setList(navData.list);
        }
        else {
            setList(null);
        }
    }

    const handleListSelected = (item) => {
        if ("list" in item) {
            setList(backList => [
                {
                    content: item.content,
                    backList: backList
                },
                ...item.list
            ]);
        }
        else if ("backList" in item) {
            setList(item.backList);
        }
    }

    const handleItemSelected = (item) => {
        if ("backList" in item) {
            setList(item.backList);
        }
        else {
            setList(null);
        }
    }

    // ------------------

    return (
        <nav className="tb-navbar">
            {wide ? (
                navData.list.map(item => (
                    <NavBarItem
                        item={item}
                        top={true}
                        hover={hover}
                        wide={wide}
                        key={item.content}
                        onListSelected={null}
                        onItemSelected={null} />
                ))
            ) : hover ? (
                <NavBarItem
                    item={navData}
                    top={true}
                    hover={hover}
                    wide={wide}
                    key={navData.root}
                    onListSelected={null}
                    onItemSelected={null} />
            ) : (
                <div
                    ref={listRef}
                    className="tb-navbar-toggle bi-list"
                    onClick={handleClick}
                    data-value="root"
                >
                    {list && (
                        <div className="tb-navbar-list tb-navbar-list-position-top tb-navbar-toggle-restore" >
                            {list.map(item => (
                                <NavBarItem
                                    item={item}
                                    top={false}
                                    hover={hover}
                                    wide={wide}
                                    key={item.content}
                                    onListSelected={handleListSelected}
                                    onItemSelected={handleItemSelected}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
}

export default NavBar;
