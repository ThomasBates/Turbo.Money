import React, { useEffect, useState } from "react";

import BudgetWorksheetMenu from '../components/BudgetWorksheetMenu';

import BudgetWorksheetAccountView from "./BudgetWorksheetAccountView";

export default function BudgetWorksheetCategoryView({ viewModel }) {
    const query = window.matchMedia("(min-width:641px)");
    const [wide, setWide] = useState(query.matches);
    useEffect(() => {
        query.addEventListener("change", e => setWide(e.matches));
    }, []);

    const menuData = {
        content: "root",
        tooltip: "Budget Category Actions",
        list: [
            { action: viewModel.showCategory, content: "Show details of this budget category", icon: "show", },
            { action: viewModel.editCategory, content: "Edit this budget category", icon: "edit", },
            { action: viewModel.addAccount, content: "Create new budget account", icon: "add", },
            { action: viewModel.deleteCategory, content: "Delete this budget category", icon: "delete", },
        ]
    };

    return (
        <>
            <tr className="tb-worksheet-row">
                <td></td>
                <td colSpan={4} className="tb-worksheet-category-text">{viewModel.name}</td>
                <td className="tb-worksheet-buttons">
                    <BudgetWorksheetMenu menuData={menuData} />
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
                    <BudgetWorksheetMenu menuData={menuData} />
                </td>
            </tr>
        </>
    );
};
