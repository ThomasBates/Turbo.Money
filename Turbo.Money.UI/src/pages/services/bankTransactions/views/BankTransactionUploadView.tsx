
import IViewProps from "common/views/IViewProps";

import IBankTransactionUploadViewModel from "../viewModels/IBankTransactionUploadViewModel";

export default function BankTransactionUploadView({ dataContext }: IViewProps) {
    const viewModel = dataContext as IBankTransactionUploadViewModel

    function handleFileChanged(event: React.ChangeEvent<HTMLInputElement>): void {
        if (event.currentTarget.files) {
            const file = event.currentTarget.files[0];
            viewModel.setFile(file);
        }
    }

    return (
        <div>
            <h1>Upload Bank Transaction File</h1>
            <input type="file" onChange={handleFileChanged} />
            <button onClick={viewModel.submit}>Submit</button>
        </div>
    );
}
