import React, { useContext, useEffect, useRef, useState } from "react";

import AppContext from 'app/AppContext';

import MenuItem from "./MenuItem";

export default function Menu({ style, hover, wide, menuData }) {
    const module = Menu.name;
    const category = Menu.name;

    // device settings
    //const hoverQuery = window.matchMedia(`(hover:hover) and (pointer:fine)`);
    //const wideQuery = window.matchMedia(`(min-width: ${menuData.minWidth})`);

    //let [hover, setHover] = useState(hoverQuery.matches);
    //const [wide, setWide] = useState(wideQuery.matches);

    //useEffect(() => {
    //    hoverQuery.addEventListener("change", e => setHover(e.matches));
    //    wideQuery.addEventListener("change", e => setWide(e.matches));
    //}, []);

    //hover = false;  //  for testing mobile on desktop

    const { logger } = useContext(AppContext);

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
        const context = `${module}.${handleClick.name}`
        e.preventDefault();

        let dataValue = (e.target as HTMLElement).getAttribute('data-value');
        logger.debug(category, context, 'dataValue =', dataValue);
        if (dataValue !== "root") {
            return;
        };

        logger.debug(category, context, 'list =', list);
        if (!list) {
            logger.debug(category, context, 'menuData =', menuData);
            setList(menuData.list);
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

    logger.debug(category, module, 'list =', list);

    // ------------------

    return (
        <nav className={style.menu} >
            {wide ? (
                menuData.list.map(item => (
                    <MenuItem
                        style={style}
                        item={item}
                        top={true}
                        hover={hover}
                        wide={wide}
                        key={item.content}
                        onListSelected={null}
                        onItemSelected={null} />
                ))
            ) : hover ? (
                <MenuItem
                    style={style}
                    item={menuData}
                    top={true}
                    hover={hover}
                    wide={wide}
                    key={menuData.content}
                    onListSelected={null}
                    onItemSelected={null} />
            ) : (
                <div ref={listRef} >
                    <div
                        className={style.toggle}
                        onClick={handleClick}
                        data-value="root"
                    />

                    {list && (
                        <div className={`${style.list} ${style.list_position_top}`} >
                            {list.map(item => (
                                <MenuItem
                                    style={style}
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
