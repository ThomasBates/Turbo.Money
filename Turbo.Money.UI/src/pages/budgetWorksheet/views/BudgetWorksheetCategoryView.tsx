import React from "react";

import BudgetWorksheetAccountView from "./BudgetWorksheetAccountView";

export default ({ viewModel }) => {

    return (
        <>
            <tr>
                <td></td>
                <td colSpan={2} className="text-success">{viewModel.name}</td>
                <td colSpan={3}></td>
            </tr>
            {viewModel.accountViewModels.map(vm => (
                <BudgetWorksheetAccountView viewModel={vm} />
            ))}
            {viewModel.showTotal &&
                <tr>
                    <td></td>
                    <td colSpan={2} className="text-success">{"Total for " + viewModel.name}</td>
                    <td className="text-end text-success">{viewModel.total}</td>
                    <td colSpan={2}></td>
                </tr>}
        </>
    );
};
