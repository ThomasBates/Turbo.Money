import { ReactNode } from "react";

import ICommonStyle from "common/views/ICommonStyle";

import styleModule from "./Modal.module.css";

//  https://deadsimplechat.com/blog/creating-a-reusable-pop-up-modal-in-react-from-scratch/

interface IProps {
    className: string | undefined;
    children?: ReactNode;
}

const Modal = ({ className, children }: IProps) => {

    const style = styleModule as ICommonStyle;

    return (
        <div className={style.modal_overlay}>
            <div className={`${style.modal_control} ${className}`}>
                {children}
            </div>
        </div>
    );
}

export default Modal;