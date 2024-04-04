import React, { useContext, useEffect, useRef, useState } from "react";

import AppContext from 'app/AppContext';

//import style from "./Modal.module.css";
import "./Modal.css";

//  https://deadsimplechat.com/blog/creating-a-reusable-pop-up-modal-in-react-from-scratch/

const Modal = ({ children }) => {

    return (
        <div className='tb-modal-overlay'>
            <div className='tb-modal'>
                {children}
                {/*<button className='tb-modal-close-button' onClick={onClose}>X</button>*/}
            </div>
        </div>
    );
}

export default Modal;