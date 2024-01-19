import React from "react";

import BudgetWorksheetButton from "../components/BudgetWorksheetButton";

import BudgetWorksheetCategoryView from "./BudgetWorksheetCategoryView";

const BudgetWorksheetSectionView = ({ viewModel }) => {
    return (
        <>
            <tr className="tb-worksheet-row">
                <td colSpan={5} className="tb-worksheet-section-text">{viewModel.name}</td>
                <td className="tb-worksheet-buttons">
                    <BudgetWorksheetButton
                        type="delete"
                        placement="right"
                        tooltip="Delete this Budget Section"
                        onClick={viewModel.deleteSection} />
                    <BudgetWorksheetButton
                        type="edit"
                        placement="right"
                        tooltip="Edit this Budget Section"
                        onClick={viewModel.editSection} />
                    <BudgetWorksheetButton
                        type="show"
                        placement="right"
                        tooltip="Show Details of this Budget Section"
                        onClick={viewModel.showSection} />
                </td>
            </tr>

            {viewModel.categoryViewModels.map(vm => (
                <BudgetWorksheetCategoryView key={vm.name} viewModel={vm} />
            ))}

            <tr className="tb-worksheet-row">
                <td></td>
                <td colSpan={2} className="tb-worksheet-buttons">
                    <BudgetWorksheetButton
                        type="add"
                        placement="left"
                        tooltip="Create New Budget Category"
                        onClick={viewModel.addCategory} />
                </td>
                <td className="tb-worksheet-section-currency">{viewModel.total}</td>
                <td colSpan={2} className="tb-worksheet-section-text">{"Total " + viewModel.name}</td>
            </tr>
        </>
    );
};

export default BudgetWorksheetSectionView;