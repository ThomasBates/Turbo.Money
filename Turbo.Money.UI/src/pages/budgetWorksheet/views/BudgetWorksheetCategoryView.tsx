import React from "react";

import BudgetWorksheetButton from "../components/BudgetWorksheetButton";

import BudgetWorksheetAccountView from "./BudgetWorksheetAccountView";

const BudgetWorksheetCategoryView = ({ viewModel }) => {
    return (
        <>
            <tr className="tb-worksheet-row">
                <td></td>
                <td colSpan={4} className="text-success">{viewModel.name}</td>
                <td className="tb-worksheet-buttons">
                    <BudgetWorksheetButton
                        type="delete"
                        placement="right"
                        tooltip="Delete this Budget Category"
                        onClick={viewModel.deleteCategory} />
                    <BudgetWorksheetButton
                        type="edit"
                        placement="right"
                        tooltip="Edit this Budget Category"
                        onClick={viewModel.editCategory} />
                    <BudgetWorksheetButton
                        type="show"
                        placement="right"
                        tooltip="Show Details of this Budget Category"
                        onClick={viewModel.showCategory} />
                </td>
            </tr>
            {viewModel.accountViewModels.map(vm => (
                <BudgetWorksheetAccountView key={vm.name} viewModel={vm} />
            ))}
            <tr className="tb-worksheet-row">
                <td colSpan={2}></td>
                <td className="tb-worksheet-buttons">
                    <BudgetWorksheetButton
                        type="add"
                        placement="left"
                        tooltip="Create New Budget Account"
                        onClick={viewModel.addAccount} />
                </td>
                <td className="text-end text-success">{viewModel.total}</td>
                <td colSpan={2} className="text-success">{"Total for " + viewModel.name}</td>
            </tr>
        </>
    );
};

export default BudgetWorksheetCategoryView;