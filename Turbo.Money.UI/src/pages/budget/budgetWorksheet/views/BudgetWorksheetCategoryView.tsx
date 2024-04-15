import { useEffect, useState } from "react";

import IStyledViewProps from "pages/common/views/IStyledViewProps";

import BudgetWorksheetMenu from '../components/BudgetWorksheetMenu';

import IBudgetWorksheetAccountViewModel from "../viewModels/IBudgetWorksheetAccountViewModel";
import IBudgetWorksheetCategoryViewModel from "../viewModels/IBudgetWorksheetCategoryViewModel";

import BudgetWorksheetAccountView from "./BudgetWorksheetAccountView";
import IBudgetWorksheetStyle from "./IBudgetWorksheetStyle";

export default function BudgetWorksheetCategoryView({ dataContext, styleContext }: IStyledViewProps) {

    const viewModel = dataContext as IBudgetWorksheetCategoryViewModel;
    const style = styleContext as IBudgetWorksheetStyle;

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
            <tr className={style.row}>
                <td></td>
                <td colSpan={4} className={style.category_text}>{viewModel.name}</td>
                <td className={style.buttons}>
                    <BudgetWorksheetMenu menuData={menuData} />
                </td>
            </tr>

            {viewModel.accountViewModels.map((viewModel: IBudgetWorksheetAccountViewModel) => (
                <BudgetWorksheetAccountView
                    key={viewModel.name}
                    dataContext={viewModel}
                    styleContext={style} />
            ))}

            <tr className={style.row}>
                <td colSpan={3}></td>
                <td className={style.category_currency}>{viewModel.total}</td>
                <td className={style.category_text}>{wide ? "Total for " + viewModel.name : "Total"}</td>
                <td className={style.buttons}>
                    <BudgetWorksheetMenu menuData={menuData} />
                </td>
            </tr>
        </>
    );
}
