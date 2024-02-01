import React from "react";

const Link = require("react-router-dom").Link;

interface BrandProps {
    to: string;
    children?: React.ReactNode;
}

interface ItemProps {
    text: string;
    to: string;
}

interface DropdownProps {
    text: string;
    children?: React.ReactNode[],
}

interface NavBarProps {
    children?: React.ReactNode[];
}

type BrandComponent = React.FunctionComponent<BrandProps>;
type ItemComponent = React.FunctionComponent<ItemProps>;
type DropdownComponent = React.FunctionComponent<DropdownProps>;
type NavBarComponent = React.FunctionComponent<NavBarProps>
    & { Brand: BrandComponent }
    & { Item: ItemComponent }
    & { Dropdown: DropdownComponent };

const Brand: BrandComponent = ({ to, children }: BrandProps): JSX.Element => {
    return (
        <li>
            <Link className="tb-navbar-brand" to={to}>
                {children}
            </Link>
        </li>
    );
};

const Item: ItemComponent = ({ text, to }: ItemProps): JSX.Element => {
    return (
        <li>
            <Link className="tb-navbar-item" to={to}>
                {text}
            </Link>
        </li>
    );
}

const Dropdown: DropdownComponent = ({ text, children }: DropdownProps): JSX.Element => {
    return (
        <>
            <li className="tb-navbar-dropdown">
                {text + " +"}
                <ul className="tb-navbar-dropdown-content">
                    {children}
                </ul>
            </li>
        </>
    );
}

const NavBarTop: NavBarComponent = ({ children }: NavBarProps): JSX.Element => {
    return (
        <ul className="tb-navbar">
            {children}
        </ul>
    );
};

NavBarTop.Brand = Brand;
NavBarTop.Item = Item;
NavBarTop.Dropdown = Dropdown;

export default NavBarTop;
