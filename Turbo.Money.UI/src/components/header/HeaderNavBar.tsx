import React from "react";

import NavBarMain from "../navBar/NavBarMain";

import style from './HeaderNavBar.module.css';

export default function HeaderNavBar({ navData }) {

    return (
        <NavBarMain navData={navData} style={style} />
    );
}

