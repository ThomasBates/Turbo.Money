import React, { useRef, useState } from "react";

//import 'bootstrap-icons/icons/arrow-clockwise.svg';
//import 'bootstrap-icons/icons/save.svg';
//import 'bootstrap-icons/icons/plus.svg';
//import 'bootstrap-icons/icons/info.svg';
//import 'bootstrap-icons/icons/pencil-fill.svg';
//import 'bootstrap-icons/icons/trash.svg';

import Dropdown from 'react-bootstrap/Dropdown';

import BudgetWorksheetTooltip from "./BudgetWorksheetTooltip";

export default function BudgetWorksheetMenuDropdownItem({ icon, text, onClick }) {
    return (
        <>
            <Dropdown.Item onClick={onClick} >
                {text}
            </Dropdown.Item>
            {/*
            <Dropdown.Item
                as={Budget}
                className={`tb-worksheet-button-left ${iconClass}`}
                variant={variant}
                onClick={onClick}
            >
                {text}
            </Dropdown.Item>
            */}
        </>
    );
}
