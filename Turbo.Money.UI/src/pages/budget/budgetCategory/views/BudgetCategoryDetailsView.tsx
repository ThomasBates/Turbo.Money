
import Button from 'react-bootstrap/Button';

import IViewProps from 'pages/common/views/IViewProps';

import IBudgetCategoryDetailsViewModel from '../viewModels/IBudgetCategoryDetailsViewModel';

export default function BankDetailsView({ dataContext }: IViewProps) {

    const viewModel = dataContext as IBudgetCategoryDetailsViewModel;

    return (
        <div className="col-md-6">
            {viewModel.showDetails ? (
                <>
                    <div>
                        <h4>{viewModel.title}</h4>
                        <div>
                            <label>
                                <strong>Category Name:</strong>
                            </label>{" "}
                            {viewModel.category.name}
                        </div>
                        <div>
                            <label>
                                <strong>Description:</strong>
                            </label>{" "}
                            {viewModel.category.description}
                        </div>
                        <div>
                            <label>
                                <strong>Section:</strong>
                            </label>{" "}
                            {viewModel.sectionName}
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
                    <p>No Budget Category selected</p>
                </div>

            )}
        </div >
    );
}
