import React, { useRef, useState } from "react";

//import 'bootstrap-icons/icons/arrow-clockwise.svg';
//import 'bootstrap-icons/icons/save.svg';
//import 'bootstrap-icons/icons/plus.svg';
//import 'bootstrap-icons/icons/info.svg';
//import 'bootstrap-icons/icons/pencil-fill.svg';
//import 'bootstrap-icons/icons/trash.svg';

import Button from 'react-bootstrap/Button';

import BudgetWorksheetTooltip from "./BudgetWorksheetTooltip";
import BudgetWorksheetMenuList from "./BudgetWorksheetMenuList";

const BudgetWorksheetMenuButton = ({tooltip, children}) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [showMenuList, setShowMenuList] = useState(false);
    const tooltipRef = useRef(null);

    return (
        <>
            <Button
                className={`tb-worksheet-button-right bi-list`}
                variant="dark"
                ref={tooltipRef}
                onMouseEnter={() => { setShowTooltip(true) }}
                onMouseLeave={() => { setShowTooltip(false) }}
                onClick={() => {
                    setShowTooltip(false);
                    setShowMenuList(true);
                }}
            />

            <BudgetWorksheetTooltip
                target={tooltipRef.current}
                show={showTooltip}
                placement="left"
            >
                {tooltip}
            </BudgetWorksheetTooltip>

            <BudgetWorksheetMenuList
                target={tooltipRef.current}
                show={showMenuList}
            >
                {children}
            </BudgetWorksheetMenuList>
        </>
    );
}

export default BudgetWorksheetMenuButton;