import React, { useRef, useState } from "react";

//import 'bootstrap-icons/icons/arrow-clockwise.svg';
//import 'bootstrap-icons/icons/save.svg';
//import 'bootstrap-icons/icons/plus.svg';
//import 'bootstrap-icons/icons/info.svg';
//import 'bootstrap-icons/icons/pencil-fill.svg';
//import 'bootstrap-icons/icons/trash.svg';

import Dropdown from 'react-bootstrap/Dropdown';

import BudgetWorksheetTooltip from "./BudgetWorksheetTooltip";

export default function BudgetWorksheetMenuDropdown({tooltip, children}) {
    const [showTooltip, setShowTooltip] = useState(false);
    const tooltipRef = useRef(null);

    return (
        <>
            <Dropdown>
                <Dropdown.Toggle
                    className="tb-worksheet-button-right bi-list"
                    variant="dark"
                    ref={tooltipRef}
                    onMouseEnter={() => { setShowTooltip(true) }}
                    onMouseLeave={() => { setShowTooltip(false) }}
                />

                <Dropdown.Menu variant="dark">
                    {children}
                </Dropdown.Menu>
            </Dropdown>

            <BudgetWorksheetTooltip
                target={tooltipRef.current}
                show={showTooltip}
                placement="left"
            >
                {tooltip}
            </BudgetWorksheetTooltip>
        </>
    );
}
