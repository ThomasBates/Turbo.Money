import React, { useEffect, useState } from "react";

import BudgetWorksheetMenu from "../components/BudgetWorksheetMenuDropdown";
import BudgetWorksheetMenuItem from "../components/BudgetWorksheetMenuDropdownItem";

import BudgetWorksheetAccountView from "./BudgetWorksheetAccountView";

function Menu({ viewModel }) {
    return (
        <BudgetWorksheetMenu tooltip="Budget Category Actions" >
            <BudgetWorksheetMenuItem
                icon="show"
                text="Show details of this budget category"
                onClick={viewModel.showCategory} />
            <BudgetWorksheetMenuItem
                icon="edit"
                text="Edit this budget category"
                onClick={viewModel.editCategory} />
            <BudgetWorksheetMenuItem
                icon="add"
                text="Create New budget account"
                onClick={viewModel.addAccount} />
            <BudgetWorksheetMenuItem
                icon="delete"
                text="Delete this budget category"
                onClick={viewModel.deleteCategory} />
        </BudgetWorksheetMenu>
    );
};

const BudgetWorksheetCategoryView = ({ viewModel }) => {
    const query = window.matchMedia("(min-width:641px)");
    const [wide, setWide] = useState(query.matches);
    useEffect(() => {
        query.addEventListener("change", e => setWide(e.matches));
    }, []);

    return (
        <>
            <tr className="tb-worksheet-row">
                <td></td>
                <td colSpan={4} className="tb-worksheet-category-text">{viewModel.name}</td>
                <td className="tb-worksheet-buttons">
                    <Menu viewModel={viewModel} />
                </td>
            </tr>

            {viewModel.accountViewModels.map(vm => (
                <BudgetWorksheetAccountView key={vm.name} viewModel={vm} />
            ))}

            <tr className="tb-worksheet-row">
                <td colSpan={3}></td>
                <td className="tb-worksheet-category-currency">{viewModel.total}</td>
                <td className="tb-worksheet-category-text">{wide ? "Total for " + viewModel.name : "Total"}</td>
                <td className="tb-worksheet-buttons">
                    <Menu viewModel={viewModel} />
                </td>
            </tr>
        </>
    );
};

export default BudgetWorksheetCategoryView;