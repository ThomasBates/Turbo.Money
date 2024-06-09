import { useEffect, useState } from "react";

import IStyledFactoryViewProps from "common/views/IStyledFactoryViewProps";

import BudgetWorksheetMenu from '../components/BudgetWorksheetMenu';

import IBudgetWorksheetSectionViewModel from "../viewModels/IBudgetWorksheetSectionViewModel";
import IBudgetWorksheetBudgetViewModel from "../viewModels/IBudgetWorksheetBudgetViewModel";

import BudgetWorksheetSectionView from "./BudgetWorksheetSectionView";

export default function BudgetWorksheetBudgetView({ style, dataContext }: IStyledFactoryViewProps) {

    const viewModel = dataContext() as IBudgetWorksheetBudgetViewModel;

    const query = window.matchMedia("(min-width:641px)");
    const [wide, setWide] = useState(query.matches);
    useEffect(() => {
        query.addEventListener("change", e => setWide(e.matches));
    }, []);

    const menuData = {
        content: "root",
        tooltip: "Budget Actions",
        list: [
            { action: viewModel.loadBudgetWorksheet, icon: "load_icon", content: "Reload Budget", },
            { action: viewModel.saveBudgetWorksheet, icon: "save_icon", content: "Save Budget",},
            { action: viewModel.addSection, icon: "add_icon", content: "Create new budget section", },
        ]
    };

    const isDeficit = viewModel.status === 'deficit';
    const statusText = (wide ? "Budget " : "") + (isDeficit ? 'Deficit' : 'Surplus');
    const currencyStyle = isDeficit ? style.deficit_currency : style.surplus_currency;
    const textStyle = isDeficit ? style.deficit_text : style.surplus_text;


    return (
        <div>
            <table className={style.table}>
                <tbody>
                    <tr>
                        <td colSpan={3}></td>
                        <td className={currencyStyle}>{viewModel.total}</td>
                        <td className={textStyle}>{statusText}</td>
                        <td className={style.buttons}>
                            <BudgetWorksheetMenu menuData={menuData} />
                        </td>
                    </tr>

                    {viewModel.sectionViewModels &&
                        viewModel.sectionViewModels.map((viewModel: IBudgetWorksheetSectionViewModel) => (
                            <BudgetWorksheetSectionView
                                key={viewModel.name}
                                dataContext={viewModel}
                                style={style} />
                        ))
                    }

                    <tr>
                        <td colSpan={3}></td>
                        <td className={currencyStyle}>{viewModel.total}</td>
                        <td className={textStyle}>{statusText}</td>
                        <td className={style.buttons}>
                            <BudgetWorksheetMenu menuData={menuData} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
