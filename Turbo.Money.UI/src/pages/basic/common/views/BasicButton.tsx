
import ICommonStyle from 'common/views/ICommonStyle';

import { combineStyles } from 'services/tools/tools';


interface IProps {
    style: ICommonStyle;
    variant: string;
    label: string;
    onClick: () => void;
    disabled?: boolean;
}

export default function BasicButton({ style, variant, label, onClick, disabled }: IProps) {
    return (
        <button
            className={combineStyles(disabled
                ? style.disabled_button_control
                : style.button_control,
                style[`${variant}_button`])}
            onClick={onClick}
            disabled={disabled}
        >
            {label}
        </button>
    );
}
