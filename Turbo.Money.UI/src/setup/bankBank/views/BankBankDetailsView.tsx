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
                                <strong>Bank Name:</strong>
                            </label>{" "}
                            {viewModel.item.name}
                        </div>
                        <div>
                            <label>
                                <strong>Bank Number:</strong>
                            </label>{" "}
                            {viewModel.item.number}
                        </div>
                        <div>
                            <label>
                                <strong>Branch Number:</strong>
                            </label>{" "}
                            {viewModel.item.transit}
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
};
