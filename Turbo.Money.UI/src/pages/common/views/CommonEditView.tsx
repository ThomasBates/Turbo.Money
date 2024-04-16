
import CommonDetailsButtons from 'pages/common/views/CommonDetailsButtons';
import ICommonStyle from 'pages/common/views/ICommonStyle';

import ICommonEditViewModel from '../viewModels/ICommonEditViewModel';

import ICommonModeViewProps from './ICommonModeViewProps';

export default function CommonEditView({ dataContext, styleContext, children }: ICommonModeViewProps) {

    const viewModel = dataContext as ICommonEditViewModel;
    const style = styleContext as ICommonStyle;

    return (
        <div className={style.mode_form}>
            <h3 className={style.mode_title}>{`${viewModel.modeText} ${viewModel.title}:`}</h3>
            <form>
                <table className={style.mode_table}>
                    <tbody>
                        {children}
                    </tbody>
                </table>
            </form>
            <CommonDetailsButtons style={style}
                modeText={viewModel.modeText}
                showButtons={true}
                showOKButton={false}
                canSubmit={viewModel.canSubmit}
                onSubmit={viewModel.submit}
                onCancel={viewModel.cancel} />
        </div>
    );
}
