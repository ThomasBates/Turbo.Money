import React, { useEffect, useRef, useState } from "react";

import NavBarItem from "./NavBarItem";

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

export default NavBarList;
