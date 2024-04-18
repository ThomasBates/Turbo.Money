
import IBasicDetailsViewModel from 'pages/basic/common/viewModels/IBasicDetailsViewModel';

import BasicModeButtons from './BasicModeButtons';
import IBasicModeViewProps from './IBasicModeViewProps';

export default function BasicDetailsView({ style, dataContext, children }: IBasicModeViewProps) {

    const viewModel = dataContext as IBasicDetailsViewModel;

    return (
        <div className={style.mode_form}>
            <h3 className={style.mode_title}>{viewModel.title}</h3>
            {viewModel.showDetails ? (
                <div>
                    <table className={style.mode_table}>
                        <tbody>
                            {children}
                        </tbody>
                    </table>

                    <BasicModeButtons style={style}
                        submitText={viewModel.submitText}
                        showButtons={viewModel.showButtons}
                        showOKButton={viewModel.showOKButton}
                        onSubmit={viewModel.submit}
                        onCancel={viewModel.cancel} />
                </div>
            ) : (
                    <div className={style.mode_not_selected}>
                    <p>{viewModel.notSelected}</p>
                </div>
            )}
        </div >
    );
}
