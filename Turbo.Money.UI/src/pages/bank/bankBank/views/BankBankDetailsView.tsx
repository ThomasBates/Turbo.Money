
import Button from 'react-bootstrap/Button';

import IViewProps from 'pages/common/views/IViewProps';

import IBankBankDetailsViewModel from '../viewModels/IBankBankDetailsViewModel';

export default function BankBankDetailsView({ dataContext }: IViewProps) {

    const viewModel = dataContext as IBankBankDetailsViewModel;

    return (
        <div className="col-md-6">
            {viewModel.showDetails ? (
                <>
                    <div>
                        <h4>{viewModel.title}</h4>
                        <div>
                            <label>
                                <strong>Bank Name:</strong>
                            </label>{" "}
                            {viewModel.bank.name}
                        </div>
                        <div>
                            <label>
                                <strong>Bank Number:</strong>
                            </label>{" "}
                            {viewModel.bank.number}
                        </div>
                        <div>
                            <label>
                                <strong>Branch Number:</strong>
                            </label>{" "}
                            {viewModel.bank.branch}
                        </div>
                    </div>

                    {viewModel.showButtons && <>
                        <Button variant="success" onClick={viewModel.submit}>
                            Submit
                        </Button>
                        <Button variant="danger" onClick={viewModel.cancel}>
                            Cancel
                        </Button>
                    </>}
                    {viewModel.showOKButton &&
                        <Button variant="primary" onClick={viewModel.cancel}>
                            OK
                        </Button>}
                </>
            ) : (
                <div>
                    <br />
                    <p>No Bank selected</p>
                </div>

            )}
        </div >
    );
}
