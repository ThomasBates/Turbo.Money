import React from "react";

import NavBarMain from "./NavBarMain";

import style from './NavBar.module.css';

export default function NavBar({ navData }) {

    return (
        <NavBarMain navData={navData} style={style} />
    );
}

