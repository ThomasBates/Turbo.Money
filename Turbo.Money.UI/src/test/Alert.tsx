declare var require: any
var React = require('react');

import {ReactNode} from 'react';

interface Props {
    children: ReactNode;
    color?: 'primary' | 'secondary' | 'danger';
    onDismiss: () => void;
}

function Alert({ children, color = "danger", onDismiss }: Props) {

    return (
        <div className={"alert alert-" + color + " alert-dismissible"} >
            {children}
            <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
                onClick={onDismiss} />
        </div>
    );
}

export default Alert;