import React, { useRef, useState } from "react";

//import 'bootstrap-icons/icons/arrow-clockwise.svg';
//import 'bootstrap-icons/icons/save.svg';
//import 'bootstrap-icons/icons/plus.svg';
//import 'bootstrap-icons/icons/info.svg';
//import 'bootstrap-icons/icons/pencil-fill.svg';
//import 'bootstrap-icons/icons/trash.svg';

import Button from 'react-bootstrap/Button';

export default function BudgetWorksheetMenuButtonItem({ icon, text, onClick }) {
    let variant;
    let iconClass;
    switch (icon) {
        case "load":
            variant = "primary";
            iconClass = "bi-arrow-clockwise";
            break;
        case "save":
            variant = "success";
            iconClass = "bi-save";
            break;
        case "add":
            variant = "success";
            iconClass = "bi-plus";
            break;
        case "show":
            variant = "primary";
            iconClass = "bi-info";
            break;
        case "edit":
            variant = "warning";
            iconClass = "bi-pencil-fill";
            break;
        case "delete":
            variant = "danger";
            iconClass = "bi-trash";
            break;
    }

    return (
        <>
            <Button
                className={`tb-worksheet-button-left ${iconClass}`}
                variant={variant}
                onClick={onClick}
            >
                {text}
            </Button>
        </>
    );
}
