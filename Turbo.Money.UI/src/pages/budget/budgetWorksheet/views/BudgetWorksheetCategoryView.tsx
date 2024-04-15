import { useEffect, useState } from "react";

import IViewProps from "pages/common/views/IViewProps";

import BudgetWorksheetMenu from '../components/BudgetWorksheetMenu';

import IBudgetWorksheetCategoryViewModel from "../viewModels/IBudgetWorksheetCategoryViewModel";

import BudgetWorksheetAccountView from "./BudgetWorksheetAccountView";
import IBudgetWorksheetAccountViewModel from "../viewModels/IBudgetWorksheetAccountViewModel";


export default function BudgetWorksheetCategoryView({ dataContext }: IViewProps) {

    const viewModel = dataContext as IBudgetWorksheetCategoryViewModel;

    const query = window.matchMedia("(min-width:641px)");
    const [wide, setWide] = useState(query.matches);
    useEffect(() => {
        query.addEventListener("change", e => setWide(e.matches));
    }, []);

    const menuData = {
        content: "root",
        tooltip: "Budget Category Actions",
        list: [
            { action: viewModel.showCategory, icon: "show_icon", content: "Show details of this budget category", },
            { action: viewModel.editCategory, icon: "edit_icon", content: "Edit this budget category", },
            { action: viewModel.addAccount, icon: "add_icon", content: "Create new budget account", },
            { action: viewModel.deleteCategory, icon: "delete_icon", content: "Delete this budget category", },
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

            {viewModel.accountViewModels.map((viewModel: IBudgetWorksheetAccountViewModel) => (
                <BudgetWorksheetAccountView key={viewModel.name} dataContext={viewModel} />
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
}
