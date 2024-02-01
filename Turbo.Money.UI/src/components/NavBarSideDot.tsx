import React, { useState } from "react";

const Link = require("react-router-dom").Link;

function NavBarBrand({ to, children }) {
    return (
        <Link className="tb-navbar-side-brand" to={to}>
            {children}
        </Link>
    );
}

function NavBarItem({ text, to }) {
    return (
        <Link className="tb-navbar-side-item" to={to}>
            {text}
        </Link>
    );
}

function NavBarDropdown({ text, children }) {
    const [showList, setShowList] = useState(false);

    const handleClick = () => {
        setShowList(!showList);
    }

    return (
        <div className="tb-navbar-side-dropdown" onClick={handleClick}>
            {text + " +"}
            {showList && (
                <div className="tb-navbar-side-dropdown-content">
                    {children.map(child => (
                        <div>
                            {child}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function NavBarSide({ children }) {
    const [showList, setShowList] = useState(false);
    const [list, setList] = useState([]);
    const [text, setText] = useState("");

    const handleMainClick = () => {
        setShowList(!showList);
        setText(text => text + "*");
    }

    const handleChildClick = (child) => {
        setText(text => text + "+");
    }

    return (
        <>
            <div className="tb-navbar-side bi-list" onClick={handleMainClick}>
                {text}
                {showList && (
                    <div className="tb-navbar-side-dropdown-content">
                        {children.map(child => (
                            <div onClick={() => handleChildClick(child)}>
                                {child}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

NavBarSide.Brand = NavBarBrand;
NavBarSide.Item = NavBarItem;
NavBarSide.Dropdown = NavBarDropdown;

export default NavBarSide;
