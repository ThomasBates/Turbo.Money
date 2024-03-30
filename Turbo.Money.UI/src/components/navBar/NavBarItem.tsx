import React from "react";

import NavBarList from "./NavBarList";
import NavBarBack from "./NavBarBack";
import NavBarLink from "./NavBarLink";
import NavBarText from "./NavBarText";

export default function NavBarItem({ style, item, top, hover, wide, onListSelected, onItemSelected }) {
    if ("list" in item)
        return (
            <NavBarList
                style={style}
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
                style={style}
                item={item}
                onListSelected={onListSelected} />
        );
    else if (("action" in item) || ("to" in item))
        return (
            <NavBarLink
                style={style}
                item={item}
                onItemSelected={onItemSelected} />
        );
    else
        return (
            <NavBarText
                style={style}
                item={item} />
        );
}
