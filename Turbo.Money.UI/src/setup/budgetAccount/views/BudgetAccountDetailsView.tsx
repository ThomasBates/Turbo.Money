import React from "react";

import Button from 'react-bootstrap/Button';

export default function BankDetailsView({ viewModel }) {

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
                                <strong>Category:</strong>
                            </label>{" "}
                            {viewModel.categoryName}
                        </div>
                        <div>
                            <label>
                                <strong>Budgeted Amount:</strong>
                            </label>{" "}
                            {viewModel.item.amount}
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
                            {viewModel.item.method}
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
};
