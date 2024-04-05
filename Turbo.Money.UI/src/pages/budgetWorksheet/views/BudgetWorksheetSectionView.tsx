import { useEffect, useState } from "react";

import BudgetWorksheetMenu from '../components/BudgetWorksheetMenu';

import BudgetWorksheetCategoryView from "./BudgetWorksheetCategoryView";

export default function BudgetWorksheetSectionView({ viewModel }) {
    const query = window.matchMedia("(min-width:641px)");
    const [wide, setWide] = useState(query.matches);
    useEffect(() => {
        query.addEventListener("change", e => setWide(e.matches));
    }, []);

    const menuData = {
        content: "root",
        tooltip: "Budget Section Actions",
        list: [
            { action: viewModel.showSection, content: "Show details of this budget section", icon: "show", },
            { action: viewModel.editSection, content: "Edit this budget section", icon: "edit", },
            { action: viewModel.addCategory, content: "Create new budget category", icon: "add", },
            { action: viewModel.deleteSection, content: "Delete this budget section", icon: "delete", },
        ]
    };

    return (
        <>
            <tr className="tb-worksheet-row">
                <td colSpan={5} className="tb-worksheet-section-text">{viewModel.name}</td>
                <td className="tb-worksheet-buttons">
                    <BudgetWorksheetMenu menuData={menuData} />
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
                    <BudgetWorksheetMenu menuData={menuData} />
                </td>
            </tr >
        </>
    );
};
