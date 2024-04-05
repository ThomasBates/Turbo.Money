import { useEffect, useState } from "react";

import Menu from "components/menu/Menu";

import style from './Header.module.css';

export default function Header({ headerData }) {
    // device settings
    const hoverQuery = window.matchMedia(`(hover:hover) and (pointer:fine)`);
    const wideQuery = window.matchMedia(`(min-width: ${headerData.minWidth})`);

    let [hover, setHover] = useState(hoverQuery.matches);
    const [wide, setWide] = useState(wideQuery.matches);

    useEffect(() => {
        hoverQuery.addEventListener("change", e => setHover(e.matches));
        wideQuery.addEventListener("change", e => setWide(e.matches));
    }, []);

    return (
        <Menu menuData={headerData} style={style} hover={hover} wide={wide} />
    );
}

