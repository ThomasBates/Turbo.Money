import React, { useEffect, useRef, useState } from "react";

import NavBarItem from "./NavBarItem";

import './NavBar.css';

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

    //hover = false;  //  for testing mobile on desktop

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
