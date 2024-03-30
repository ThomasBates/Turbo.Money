import React from "react";

import Overlay from 'react-bootstrap/Overlay';

export default function BudgetWorksheetTooltip({target, show, placement, children }) {
    return (
        <Overlay target={target} show={show} placement={placement}>
            {({
                placement: _placement,
                arrowProps: _arrowProps,
                show: _show,
                popper: _popper,
                hasDoneInitialMeasure: _hasDoneInitialMeasure,
                ...props
            }) => (
                <div className="tb-worksheet-tooltip"
                    {...props}
                    style={props.style}
                >
                    {children}
                </div>
            )}
        </Overlay>
    );
}
