
import Button from 'react-bootstrap/Button';

import IViewProps from 'pages/common/views/IViewProps';

import IBankAccountDetailsViewModel from '../viewModels/IBankAccountDetailsViewModel';

export default function BankAccountDetailsView({ dataContext }: IViewProps) {

    const viewModel = dataContext as IBankAccountDetailsViewModel

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
                            {viewModel.bankName}
                        </div>
                        <div>
                            <label>
                                <strong>Account Name:</strong>
                            </label>{" "}
                            {viewModel.account.name}
                        </div>
                        <div>
                            <label>
                                <strong>Description:</strong>
                            </label>{" "}
                            {viewModel.account.description}
                        </div>
                        <div>
                            <label>
                                <strong>Account Number:</strong>
                            </label>{" "}
                            {viewModel.account.number}
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
                    <p>No Bank Account selected</p>
                </div>

            )}
        </div >
    );
}
