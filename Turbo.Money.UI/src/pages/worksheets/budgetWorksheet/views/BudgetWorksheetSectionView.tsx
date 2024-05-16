import { useEffect, useState } from "react";

import IStyledViewProps from "common/views/IStyledViewProps";

import BudgetWorksheetMenu from '../components/BudgetWorksheetMenu';

import IBudgetWorksheetCategoryViewModel from "../viewModels/IBudgetWorksheetCategoryViewModel";
import IBudgetWorksheetSectionViewModel from "../viewModels/IBudgetWorksheetSectionViewModel";

import BudgetWorksheetCategoryView from "./BudgetWorksheetCategoryView";

export default function BudgetWorksheetSectionView({ style, dataContext }: IStyledViewProps) {

    const viewModel = dataContext as IBudgetWorksheetSectionViewModel;

    const query = window.matchMedia("(min-width:641px)");
    const [wide, setWide] = useState(query.matches);
    useEffect(() => {
        query.addEventListener("change", e => setWide(e.matches));
    }, []);

    const menuData = {
        content: "root",
        tooltip: "Budget Section Actions",
        list: [
            { action: viewModel.showSection, icon: "show_icon", content: "Show details of this budget section", },
            { action: viewModel.editSection, icon: "edit_icon", content: "Edit this budget section", },
            { action: viewModel.addCategory, icon: "add_icon", content: "Create new budget category", },
            { action: viewModel.deleteSection, icon: "delete_icon", content: "Delete this budget section", },
        ]
    };

    return (
        <>
            <tr className={style.row}>
                <td colSpan={5} className={style.section_text}>{viewModel.name}</td>
                <td className={style.buttons}>
                    <BudgetWorksheetMenu menuData={menuData} />
                </td>
            </tr>

            {viewModel.categoryViewModels.map((viewModel: IBudgetWorksheetCategoryViewModel) => (
                <BudgetWorksheetCategoryView
                    key={viewModel.name}
                    dataContext={viewModel}
                    style={style} />
            ))}

            <tr className={style.row}>
                <td colSpan={3}></td >
                <td className={style.section_currency}>{viewModel.total}</td>
                <td className={style.section_text}>{wide ? "Total " + viewModel.name : "Total"}</td>
                <td className={style.buttons}>
                    <BudgetWorksheetMenu menuData={menuData} />
                </td>
            </tr >
        </>
    );
}
