
import ICommonStyle from 'common/views/ICommonStyle';

import BasicButton from './BasicButton';

interface IProps {
    style: ICommonStyle;
    submitText: string;
    showButtons: boolean;
    showOKButton: boolean;
    canSubmit?: boolean;
    onSubmit: () => void;
    onCancel: () => void;
}

export default function BasicModeButtons({ style, submitText, showButtons, showOKButton, canSubmit, onSubmit, onCancel }: IProps) {
    return (
        <div className={style.mode_button_panel}>
            {showButtons && <>
                <BasicButton style={style}
                    variant='submit'
                    label={submitText}
                    onClick={onSubmit}
                    disabled={canSubmit === false} />
                <BasicButton style={style}
                    variant='cancel'
                    label='Cancel'
                    onClick={onCancel} />
            </>}

            {showOKButton &&
                <BasicButton style={style}
                variant='ok'
                label='OK'
                onClick={onCancel} />
            }
        </div>
    );
}
