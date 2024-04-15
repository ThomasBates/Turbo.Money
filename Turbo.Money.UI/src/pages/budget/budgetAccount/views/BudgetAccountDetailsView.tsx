
import Button from 'react-bootstrap/Button';

import IViewProps from 'pages/common/views/IViewProps';

import IBudgetAccountDetailsViewModel from '../viewModels/IBudgetAccountDetailsViewModel';

export default function BankDetailsView({ dataContext }: IViewProps) {

    const viewModel = dataContext as IBudgetAccountDetailsViewModel;

    return (
        <div className="col-md-6">
            {viewModel.showDetails ? (
                <>
                    <div>
                        <h4>{viewModel.title}</h4>
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
                                <strong>Category:</strong>
                            </label>{" "}
                            {viewModel.categoryName}
                        </div>
                        <div>
                            <label>
                                <strong>Budgeted Amount:</strong>
                            </label>{" "}
                            {viewModel.account.amount}
                        </div>
                        <div>
                            <label>
                                <strong>Amount Type:</strong>
                            </label>{" "}
                            {viewModel.typeName}
                        </div>
                        <div>
                            <label>
                                <strong>Payment Method:</strong>
                            </label>{" "}
                            {viewModel.account.method}
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
