import React, { useRef, useState } from "react";

//import 'bootstrap-icons/icons/arrow-clockwise.svg';
//import 'bootstrap-icons/icons/save.svg';
//import 'bootstrap-icons/icons/plus.svg';
//import 'bootstrap-icons/icons/info.svg';
//import 'bootstrap-icons/icons/pencil-fill.svg';
//import 'bootstrap-icons/icons/trash.svg';

import Button from 'react-bootstrap/Button';

import BudgetWorksheetTooltip from "./BudgetWorksheetTooltip";

const BudgetWorksheetButton = ({ type, placement, tooltip, onClick }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const tooltipRef = useRef(null);

    let variant;
    let icon;
    switch (type) {
        case "menu":
            variant = "dark";
            icon = "bi-list";
            break;
        case "load":
            variant = "primary";
            icon = "bi-arrow-clockwise";
            break;
        case "save":
            variant = "success";
            icon = "bi-save";
            break;
        case "add":
            variant = "success";
            icon = "bi-plus";
            break;
        case "show":
            variant = "primary";
            icon = "bi-info";
            break;
        case "edit":
            variant = "warning";
            icon = "bi-pencil-fill";
            break;
        case "delete":
            variant = "danger";
            icon = "bi-trash";
            break;
    }

    const tooltipPlacement = placement === "left" ? "right" : "left";

    return (
        <>
            <Button
                className={`tb-worksheet-button-${placement} ${icon}`}
                variant={variant}
                ref={tooltipRef}
                onMouseEnter={() => { setShowTooltip(true) }}
                onMouseLeave={() => { setShowTooltip(false) }}
                onClick={() => {
                    setShowTooltip(false);
                    onClick();
                }}
            />

            <BudgetWorksheetTooltip
                target={tooltipRef.current}
                show={showTooltip}
                placement={tooltipPlacement}
            >
                {tooltip}
            </BudgetWorksheetTooltip>
        </>
    );
}

export default BudgetWorksheetButton;