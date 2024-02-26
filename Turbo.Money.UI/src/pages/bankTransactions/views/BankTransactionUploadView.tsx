import React from 'react';

function BankTransactionUploadView({ viewModel }) {
    viewModel = viewModel();

    return (
        <div>
            <h1>Upload Bank Transaction File</h1>
            <input type="file" onChange={viewModel.handleFileChanged} />
            <button onClick={viewModel.submit}>Submit</button>
        </div>
    );
}

export default BankTransactionUploadView;