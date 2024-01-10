import React from "react";

export default ({ viewModel }) => {

    return (
        <>
            <tr>
                <td></td>
                <td></td>
                <td>{viewModel.name}</td>
                <td className="text-warning text-end">{viewModel.amount}</td>
                <td>{viewModel.typeName}</td>
                <td className="text-white-50">{viewModel.description}</td>
            </tr>
        </>
    );
};
