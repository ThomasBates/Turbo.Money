import React, { useRef, useState } from "react";

import Modal from 'react-bootstrap/Modal';

const BudgetWorksheetModal = ({show, onHide, children }) => {
    return (
        show && (
            <Modal
                show={show}
                onHide={onHide}
                centered
                backdrop="static"
                animation={false}
            >
                <Modal.Body>
                    {children}
                </Modal.Body>
            </Modal>
        )
    );
}

export default BudgetWorksheetModal;
