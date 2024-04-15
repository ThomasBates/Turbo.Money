import { useEffect, useState } from "react";

import { IMenuData } from "components/menu/IMenuData";
import Menu from "components/menu/Menu";

import headerStyle from './Header.module.css';

interface IProps {
    headerData: IMenuData
}

export default function Header({ headerData }: IProps) {
    // device settings
    const hoverQuery = window.matchMedia(`(hover:hover) and (pointer:fine)`);
    const wideQuery = window.matchMedia(`(min-width: ${headerData.minWidth})`);

    const [hover, setHover] = useState(hoverQuery.matches);
    const [wide, setWide] = useState(wideQuery.matches);

    useEffect(() => {
        hoverQuery.addEventListener("change", e => setHover(e.matches));
        wideQuery.addEventListener("change", e => setWide(e.matches));
    }, []);

    return (
        <Menu menuData={headerData} customStyle={headerStyle} hover={hover} wide={wide} />
    );
}

