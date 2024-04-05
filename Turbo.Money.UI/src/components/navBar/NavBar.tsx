import { useEffect, useState } from "react";

import Menu from "components/menu/Menu";

import style from './NavBar.module.css';

export default function NavBar({ navData }) {
    // device settings
    const hoverQuery = window.matchMedia(`(hover:hover) and (pointer:fine)`);
    const wideQuery = window.matchMedia(`(min-width: ${navData.minWidth})`);

    let [hover, setHover] = useState(hoverQuery.matches);
    const [wide, setWide] = useState(wideQuery.matches);

    useEffect(() => {
        hoverQuery.addEventListener("change", e => setHover(e.matches));
        wideQuery.addEventListener("change", e => setWide(e.matches));
    }, []);

    return (
        <Menu menuData={navData} style={style} hover={hover} wide={wide} />
    );
}
