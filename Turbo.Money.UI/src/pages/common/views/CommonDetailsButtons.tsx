
import ICommonStyle from 'pages/common/views/ICommonStyle';

import CommonButton from './CommonButton';

interface ICommonDetailsButtonsProps {
    style: ICommonStyle;
    modeText: string;
    showButtons: boolean;
    showOKButton: boolean;
    canSubmit?: boolean;
    onSubmit: () => void;
    onCancel: () => void;
}

export default function CommonDetailsButtons({ style, modeText, showButtons, showOKButton, canSubmit, onSubmit, onCancel }: ICommonDetailsButtonsProps) {
    return (
        <div className={style.mode_button_panel}>
            {showButtons && <>
                <CommonButton style={style}
                    variant='submit'
                    label={modeText}
                    onClick={onSubmit}
                    disabled={canSubmit === false} />
                <CommonButton style={style}
                    variant='cancel'
                    label='Cancel'
                    onClick={onCancel} />
            </>}

            {showOKButton &&
                <CommonButton style={style}
                variant='ok'
                label='OK'
                onClick={onCancel} />
            }
        </div>
    );
}
