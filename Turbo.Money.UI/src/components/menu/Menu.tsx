
import React, { useEffect, useRef, useState } from "react";

import { useAppContext } from 'app/AppContextAccess';
import { getRandomString } from 'services/tools/tools';

import { IMenuData, IMenuDataItem } from "./IMenuData";
import MenuItem from "./MenuItem";

import IMenuStyle, { combineStyles } from "./IMenuStyle";
import MenuStyle from "./MenuStyle";

interface IProps {
    customStyle: IMenuStyle;
    hover: boolean
    wide: boolean
    menuData: IMenuData
}

export default function Menu({ customStyle, hover, wide, menuData }: IProps) {
    const module = Menu.name;
    const category = Menu.name;

    const { logger } = useAppContext();

    // in situ one list for !hover and !wide
    const [list, setList] = useState<IMenuDataItem[] | null>(null);
    const listRef = useRef<HTMLInputElement>(null);

    const style = MenuStyle(customStyle);
    //if (!style)
    //    style = defaultStyle;

    useEffect(() => {
        if (!hover && !wide) {
            document.addEventListener("mousedown", handleMouseDown);
        }
    });

    const handleMouseDown = (event: MouseEvent) => {
        if (!listRef.current?.contains(event.target as Node)) {
            setList(null);
        }
    }

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        const context = `${module}.${handleClick.name}`
        event.preventDefault();

        const dataValue = (event.target as HTMLElement).getAttribute('data-value');
        logger.verbose(category, context, 'dataValue =', dataValue);
        if (dataValue !== "root") {
            return;
        }

        logger.verbose(category, context, 'list =', list);
        if (!list) {
            logger.verbose(category, context, 'menuData =', menuData);

            if (menuData.list !== undefined)
                setList(menuData.list);
        }
        else {
            setList(null);
        }
    }

    const handleListSelected = (item: IMenuDataItem) => {
        if ('list' in item) {
            const newList: IMenuDataItem[] = [
                {
                    content: item.content,
                    backList: list || []
                },
                ...item.list
            ];
            setList(newList);
        }
        else if ('backList' in item) {
            setList(item.backList);
        }
    }

    const handleItemSelected = (item: IMenuDataItem) => {
        if ('backList' in item) {
            setList(item.backList);
        }
        else {
            setList(null);
        }
    }

    //logger.debug(category, module, 'list =', list);

    // ------------------

    //logger.debug(category, module, 'style =', style);
    //logger.debug(category, module, 'defaultStyle =', defaultStyle);

    const rootClass = combineStyles(style.root_control, style.root_theme);
    const rootIconClass = style.root_icon;
    const inSituClass = combineStyles(style.list_control, style.list_position_top, style.list_theme);

    return (
        <nav className={rootClass} >
            {wide ? (
                menuData.list.map((item: IMenuDataItem) => (
                    <MenuItem
                        style={style}
                        item={item}
                        top={true}
                        hover={hover}
                        wide={wide}
                        key={getRandomString(8)}
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
                    key={getRandomString(8)}
                    onListSelected={null}
                    onItemSelected={null} />
            ) : (
                <div ref={listRef} >
                    <div
                        className={rootIconClass}
                        onClick={handleClick}
                        data-value="root"
                    />

                    {list && (
                        <div className={inSituClass} >
                            {list.map((item: IMenuDataItem) => (
                                <MenuItem
                                    style={style}
                                    item={item}
                                    top={false}
                                    hover={hover}
                                    wide={wide}
                                    key={getRandomString(8)}
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
