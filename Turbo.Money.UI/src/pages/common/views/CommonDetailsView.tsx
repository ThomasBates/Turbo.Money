
import ICommonDetailsViewModel from '../viewModels/ICommonDetailsViewModel';

import CommonDetailsButtons from './CommonDetailsButtons';
import ICommonModeViewProps from './ICommonModeViewProps';
import ICommonStyle from './ICommonStyle';

export default function CommonDetailsView({ dataContext, styleContext, children }: ICommonModeViewProps) {

    const viewModel = dataContext as ICommonDetailsViewModel;
    const style = styleContext as ICommonStyle;

    return (
        <div className={style.mode_form}>
            <h3 className={style.mode_title}>{`${viewModel.modeText} ${viewModel.title}:`}</h3>
            {viewModel.showDetails ? (
                <div>
                    <table className={style.mode_table}>
                        <tbody>
                            {children}
                        </tbody>
                    </table>

                    <CommonDetailsButtons style={style}
                        modeText={viewModel.modeText}
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
