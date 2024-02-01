import React from "react";

import Overlay from 'react-bootstrap/Overlay';

const BudgetWorksheetMenuList = ({target, show, children }) => {
    return (
        <Overlay target={target} show={show} placement="left">
            {({
                placement: _placement,
                arrowProps: _arrowProps,
                show: _show,
                popper: _popper,
                hasDoneInitialMeasure: _hasDoneInitialMeasure,
                ...props
            }) => (
                <div className="tb-worksheet-menu-list"
                    {...props}
                    style={props.style}
                >
                    {children}
                </div>
            )}
        </Overlay>
    );
}

export default BudgetWorksheetMenuList;