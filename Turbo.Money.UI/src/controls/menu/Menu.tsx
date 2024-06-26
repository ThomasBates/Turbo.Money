
import React, { useEffect, useRef, useState } from "react";

import ICommonStyle from "common/views/ICommonStyle";

import { getRandomString, combineStyles, mergeStyles } from 'services/tools/tools';

import { IMenuData, IMenuDataItem } from "./IMenuData";
import MenuItem from "./MenuItem";

import defaultStyleModule from './Menu.module.css';

interface IProps {
    customStyle: ICommonStyle;
    hover: boolean
    wide: boolean
    menuData: IMenuData
}

export default function Menu({ customStyle, hover, wide, menuData }: IProps) {

    // in situ one list for !hover and !wide
    const [list, setList] = useState<IMenuDataItem[] | null>(null);
    const listRef = useRef<HTMLInputElement>(null);

    const style = mergeStyles(customStyle, defaultStyleModule);

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
        event.preventDefault();

        const dataValue = (event.target as HTMLElement).getAttribute('data-value');
        if (dataValue !== "root") {
            return;
        }

        if (!list) {
            if (menuData.list !== undefined)
                setList(menuData.list);
        }
        else {
            setList(null);
        }
    }

    const handleListSelected = (item: IMenuDataItem | null) => {
        if (!item) {
            setList(null);
        }
        else if ('list' in item) {
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

    // ------------------

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
