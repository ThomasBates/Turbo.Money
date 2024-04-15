import { useEffect, useState } from "react";

import { IMenuData } from "components/menu/IMenuData";
import Menu from "components/menu/Menu";

import navBarStyle from './NavBar.module.css';

interface IProps {
    navData: IMenuData
}

export default function NavBar({ navData }: IProps) {
    // device settings
    const hoverQuery = window.matchMedia(`(hover:hover) and (pointer:fine)`);
    const wideQuery = window.matchMedia(`(min-width: ${navData.minWidth})`);

    const [hover, setHover] = useState(hoverQuery.matches);
    const [wide, setWide] = useState(wideQuery.matches);

    useEffect(() => {
        hoverQuery.addEventListener("change", e => setHover(e.matches));
        wideQuery.addEventListener("change", e => setWide(e.matches));
    });

    return (
        <Menu menuData={navData} customStyle={navBarStyle} hover={hover} wide={wide} />
    );
}
