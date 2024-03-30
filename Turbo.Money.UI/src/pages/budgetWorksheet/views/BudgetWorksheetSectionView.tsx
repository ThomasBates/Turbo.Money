import React, { useEffect, useState } from "react";

import BudgetWorksheetMenu from "../components/BudgetWorksheetMenuDropdown";
import BudgetWorksheetMenuItem from "../components/BudgetWorksheetMenuDropdownItem";

import BudgetWorksheetCategoryView from "./BudgetWorksheetCategoryView";

function Menu({ viewModel }) {
    return (
        <BudgetWorksheetMenu tooltip="Budget Section Actions" >
            <BudgetWorksheetMenuItem
                icon="show"
                text="Show details of this budget section"
                onClick={viewModel.showSection} />
            <BudgetWorksheetMenuItem
                icon="edit"
                text="Edit this budget section"
                onClick={viewModel.editSection} />
            <BudgetWorksheetMenuItem
                icon="add"
                text="Create New budget category"
                onClick={viewModel.addCategory} />
            <BudgetWorksheetMenuItem
                icon="delete"
                text="Delete this budget section"
                onClick={viewModel.deleteSection} />
        </BudgetWorksheetMenu>
    );
};

export default function BudgetWorksheetSectionView({ viewModel }) {
    const query = window.matchMedia("(min-width:641px)");
    const [wide, setWide] = useState(query.matches);
    useEffect(() => {
        query.addEventListener("change", e => setWide(e.matches));
    }, []);

    return (
        <>
            <tr className="tb-worksheet-row">
                <td colSpan={5} className="tb-worksheet-section-text">{viewModel.name}</td>
                <td className="tb-worksheet-buttons">
                    <Menu viewModel={viewModel} />
                </td>
            </tr>

            {viewModel.categoryViewModels.map(vm => (
                <BudgetWorksheetCategoryView key={vm.name} viewModel={vm} />
            ))}

            <tr className="tb-worksheet-row">
                <td colSpan={3}></td >
                <td className="tb-worksheet-section-currency">{viewModel.total}</td>
                <td className="tb-worksheet-section-text">{wide ? "Total " + viewModel.name : "Total"}</td>
                <td className="tb-worksheet-buttons">
                    <Menu viewModel={viewModel} />
                </td>
            </tr >
        </>
    );
};
