
import { useEffect, useRef, useState } from "react";

import { getRandomString } from "services/tools/tools";

import MenuItem from "./MenuItem";
import { IMenuDataList, IMenuDataItem } from "./IMenuData";
import IMenuStyle, { combineStyles } from "./IMenuStyle";


interface IProps {
    style: IMenuStyle;
    item: IMenuDataList;
    top: boolean;
    hover: boolean;
    wide: boolean;
    onListSelected: null | ((item: IMenuDataItem | null) => void);
    onItemSelected: null | ((item: IMenuDataItem) => void);
}

export default function MenuList({ style, item, top, hover, wide, onListSelected, onItemSelected }: IProps) {
    const [showList, setShowList] = useState(false);
    const [listPosition, setListPosition] = useState("");
    const mainRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!hover && wide) {
            document.addEventListener("mousedown", handleMouseDown);
        }
        calcListPosition();
    });//, [mainRef]);

    const handleMouseDown = (event: MouseEvent) => {
        if (!mainRef.current?.contains(event.target as Node)) {
            setShowList(false);
        }
    }

    const calcListPosition = () => {
        if (top) {
            setListPosition("top");
        }
        else if (mainRef && mainRef.current) {
            const mainRect = mainRef.current.getBoundingClientRect();
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

    const isEnabled = !("enabled" in item) || item.enabled;

    const handleMouseEnter = () => {
        if (hover && isEnabled) {
            setShowList(true);
        }
    }

    const handleMouseLeave = () => {
        if (hover) {
            setShowList(false);
        }
    }

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        if (!hover && isEnabled) {
            event.preventDefault();
            const dataValue = (event.target as HTMLElement).getAttribute('data-value');
            if (dataValue !== item.content) {
                return;
            }

            if (wide) {
                setShowList(prev => !prev);
            }
            else if (onListSelected) {
                onListSelected(item);
            }
        }
    }

    const handleListSelected = (item: IMenuDataItem) => {
        if (onListSelected) {
            onListSelected(item);
        }
    }

    const handleItemSelected = (item: IMenuDataItem) => {
        setShowList(false);
        if (onListSelected) {
            onListSelected(null);
        }
        if (onItemSelected) {
            onItemSelected(item);
        }
    }

    const isRoot = (item.content === "root");

    const className = isRoot
        ? style.root_icon
        : isEnabled
            ? combineStyles(style.item_control, style.item_theme)
            : combineStyles(style.disabled_item_control, style.disabled_item_theme);

    const iconClass = isRoot
        ? style.root_icon
        : isEnabled
            ? top
                ? ((item.icon && style[item.icon]) || style.list_top_icon)
                : ((item.icon && style[item.icon]) || style.list_sub_icon)
            : top
                ? ((item.disabledIcon && style[item.disabledIcon]) || style.list_top_disabled_icon)
                : ((item.disabledIcon && style[item.disabledIcon]) || style.list_sub_disabled_icon);

    const contentClass = isEnabled
        ? style.list_content
        : style.list_disabled_content;

    const listClass = combineStyles(
        style.list_control,
        style[`list_position_${listPosition}`],
        style.list_theme);

    return (
        <div
            ref={mainRef}
            className={className}
            key={getRandomString(8)}
            data-value={item.content}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            {!isRoot && (
                <>
                    <span className={iconClass} />
                    <span className={contentClass}>{item.content}</span>
                </>
            )}

            {showList && (
                <div
                    className={listClass}
                >
                    {item.list.map(item => (
                        <MenuItem
                            style={style}
                            item={item}
                            top={false}
                            hover={hover}
                            wide={wide}
                            key={getRandomString(8)}
                            onListSelected={handleListSelected}
                            onItemSelected={handleItemSelected} />
                    ))}
                </div>
            )}
        </div>
    );
}
