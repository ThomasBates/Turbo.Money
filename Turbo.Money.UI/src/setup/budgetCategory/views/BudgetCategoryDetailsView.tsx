import React from "react";

import Button from 'react-bootstrap/Button';

const BankDetailsView = ({ viewModel }) => {

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
                            {viewModel.item.name}
                        </div>
                        <div>
                            <label>
                                <strong>Description:</strong>
                            </label>{" "}
                            {viewModel.item.description}
                        </div>
                        <div>
                            <label>
                                <strong>Income/Expenses:</strong>
                            </label>{" "}
                            {viewModel.item.direction == "in" ? "Income" : "Expenses"}
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
                </>
            ) : (
                <div>
                    <br />
                    <p>No Budget Category selected</p>
                </div>

            )}
        </div >
    );
};

export default BankDetailsView;