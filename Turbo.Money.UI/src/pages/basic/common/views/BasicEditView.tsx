
import IBasicEditViewModel from 'pages/basic/common/viewModels/IBasicEditViewModel';
import BasicModeButtons from 'pages/basic/common/views/BasicModeButtons';

import IBasicModeViewProps from './IBasicModeViewProps';

export default function BasicEditView({ style, dataContext, children }: IBasicModeViewProps) {

    const viewModel = dataContext as IBasicEditViewModel;

    return (
        <div className={style.mode_form}>
            <h3 className={style.mode_title}>{viewModel.title}</h3>
            <form>
                <table className={style.mode_table}>
                    <tbody>
                        {children}
                    </tbody>
                </table>
            </form>
            <BasicModeButtons style={style}
                submitText={viewModel.submitText}
                showButtons={true}
                showOKButton={false}
                canSubmit={viewModel.canSubmit}
                onSubmit={viewModel.submit}
                onCancel={viewModel.cancel} />
        </div>
    );
}
