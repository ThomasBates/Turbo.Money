import IViewProps from "pages/common/views/IViewProps";

import IBankTransactionUploadViewModel from "../viewModels/IBankTransactionUploadViewModel";

export default function BankTransactionUploadView({ dataContext }: IViewProps) {
    const viewModel = dataContext as IBankTransactionUploadViewModel

    return (
        <div>
            <h1>Upload Bank Transaction File</h1>
            <input type="file" onChange={viewModel.handleFileChanged} />
            <button onClick={viewModel.submit}>Submit</button>
        </div>
    );
}
