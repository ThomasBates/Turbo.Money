import { useEffect, useState } from "react";

import Modal from 'components/modal/Modal';

import ICommonModeViewModel from "pages/common/viewModels/ICommonModeViewModel";
import IViewFactoryProps from "pages/common/views/IViewFactoryProps";

import BudgetSectionDetailsView from "pages/budget/budgetSection/views/BudgetSectionDetailsView";
import BudgetSectionEditView from "pages/budget/budgetSection/views/BudgetSectionEditView";
import BudgetCategoryDetailsView from "pages/budget/budgetCategory/views/BudgetCategoryDetailsView";
import BudgetCategoryEditView from "pages/budget/budgetCategory/views/BudgetCategoryEditView";
import BudgetAccountDetailsView from "pages/budget/budgetAccount/views/BudgetAccountDetailsView";
import BudgetAccountEditView from "pages/budget/budgetAccount/views/BudgetAccountEditView";

import BudgetWorksheetMenu from '../components/BudgetWorksheetMenu';

import IBudgetWorksheetViewModel from "../viewModels/IBudgetWorksheetViewModel";

import BudgetWorksheetSectionView from "./BudgetWorksheetSectionView";

import styleContext from "./BudgetWorksheet.module.css";
import IBudgetWorksheetSectionViewModel from "../viewModels/IBudgetWorksheetSectionViewModel";
import IBudgetWorksheetModeViews from "./IBudgetWorksheetModeViews";
import IBudgetWorksheetStyle from "./IBudgetWorksheetStyle";

const modeViews: Record<string, IBudgetWorksheetModeViews> = {
    BudgetSection: {
        add: BudgetSectionEditView,
        edit: BudgetSectionEditView,
        show: BudgetSectionDetailsView,
        delete: BudgetSectionDetailsView,
    },
    BudgetCategory: {
        add: BudgetCategoryEditView,
        edit: BudgetCategoryEditView,
        show: BudgetCategoryDetailsView,
        delete: BudgetCategoryDetailsView,
    },
    BudgetAccount: {
        add: BudgetAccountEditView,
        edit: BudgetAccountEditView,
        show: BudgetAccountDetailsView,
        delete: BudgetAccountDetailsView,
    }
}

interface IModeViewProps {
    modeViewModel: ICommonModeViewModel;
}

const ModeView = ({ modeViewModel }: IModeViewProps) => {
    const SelectedModeView = modeViews[modeViewModel.entity][modeViewModel.mode];
    return (
        <SelectedModeView dataContext={modeViewModel} />
    );
}

export default function BudgetWorksheetView({ dataContext }: IViewFactoryProps) {

    const viewModel = dataContext() as IBudgetWorksheetViewModel;
    const style = styleContext as IBudgetWorksheetStyle;

    useEffect(() => {
        viewModel.loadBudgetData();
    }, []);

    const query = window.matchMedia("(min-width:641px)");
    const [wide, setWide] = useState(query.matches);
    useEffect(() => {
        query.addEventListener("change", e => setWide(e.matches));
    }, []);

    const menuData = {
        content: "root",
        tooltip: "Budget Actions",
        list: [
            { action: viewModel.loadBudgetData, icon: "load_icon", content: "Reload Budget", },
            { action: viewModel.saveBudgetData, icon: "save_icon", content: "Save Budget",},
            { action: viewModel.addSection, icon: "add_icon", content: "Create new budget section", },
        ]
    };

    return (
        <>
            <div>
                <table className={style.table}> 
                    <tbody>
                        <tr>
                            <td colSpan={6} className={style.title}><h1>{viewModel.title}</h1></td>
                        </tr>
                        <tr>
                            <td colSpan={3}></td>
                            <td className={style.currency}>{viewModel.total}</td>
                            <td className={style.text}>{(wide ? "Budget " : "") + viewModel.status}</td>
                            <td className={style.buttons}>
                                <BudgetWorksheetMenu menuData={menuData} />
                            </td>
                        </tr>

                        {viewModel.sectionViewModels &&
                            viewModel.sectionViewModels.map((viewModel: IBudgetWorksheetSectionViewModel) => (
                                <BudgetWorksheetSectionView
                                    key={viewModel.name}
                                    dataContext={viewModel}
                                    styleContext={style} />
                            ))
                        }

                        <tr>
                            <td colSpan={3}></td>
                            <td className={style.currency}>{viewModel.total}</td>
                            <td className={style.text}>{(wide ? "Budget " : "") + viewModel.status}</td>
                            <td className={style.buttons}>
                                <BudgetWorksheetMenu menuData={menuData} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {viewModel.modeViewModel &&
                <Modal >
                    <ModeView modeViewModel={viewModel.modeViewModel} />
                </Modal>
            }
        </>
    );
}
