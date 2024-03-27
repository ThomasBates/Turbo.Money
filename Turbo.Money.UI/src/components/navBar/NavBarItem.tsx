import React from "react";

import NavBarList from "./NavBarList";
import NavBarBack from "./NavBarBack";
import NavBarLink from "./NavBarLink";
import NavBarFunc from "./NavBarFunc";
import NavBarText from "./NavBarText";

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
    else if ("func" in item)
        return (
            <NavBarFunc
                item={item}
                onItemSelected={onItemSelected} />
        );
    else
        return (
            <NavBarText item={item} />
        );
}

export default NavBarItem;
