import React from "react";

import BudgetWorksheetCategoryView from "./BudgetWorksheetCategoryView";

export default ({ viewModel }) => {

    return (
        <>
            <tr>
                <td colSpan={3} className="text-info">{viewModel.name}</td>
                <td colSpan={3}></td>
            </tr>
            {viewModel.categoryViewModels.map(vm => (
                <BudgetWorksheetCategoryView key={vm.name} viewModel={vm} />
            ))}
            <tr>
                <td colSpan={3} className="text-info">{"Total " + viewModel.name}</td>
                <td className="text-end text-info">{viewModel.total}</td>
                <td colSpan={2}></td>
            </tr>
            <tr>
                <td colSpan={6}></td>
            </tr>
        </>
    );
};
