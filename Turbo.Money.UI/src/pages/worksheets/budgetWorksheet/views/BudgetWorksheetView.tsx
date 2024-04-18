import { useEffect, useState } from "react";

import ICommonStyle from "common/views/ICommonStyle";
import IFactoryViewProps from "common/views/IFactoryViewProps";

import Modal from 'controls/modal/Modal';

import BudgetAccountDetailsView from "pages/basic/budgetAccount/views/BudgetAccountDetailsView";
import BudgetAccountEditView from "pages/basic/budgetAccount/views/BudgetAccountEditView";
import BudgetCategoryDetailsView from "pages/basic/budgetCategory/views/BudgetCategoryDetailsView";
import BudgetCategoryEditView from "pages/basic/budgetCategory/views/BudgetCategoryEditView";
import BudgetSectionDetailsView from "pages/basic/budgetSection/views/BudgetSectionDetailsView";
import BudgetSectionEditView from "pages/basic/budgetSection/views/BudgetSectionEditView";

import IBasicModeViewModel from "pages/basic/common/viewModels/IBasicModeViewModel";

import BudgetWorksheetMenu from '../components/BudgetWorksheetMenu';

import IBudgetWorksheetSectionViewModel from "../viewModels/IBudgetWorksheetSectionViewModel";
import IBudgetWorksheetViewModel from "../viewModels/IBudgetWorksheetViewModel";

import BudgetWorksheetSectionView from "./BudgetWorksheetSectionView";
import IBudgetWorksheetModeViews from "./IBudgetWorksheetModeViews";

import basicStyleModule from 'pages/basic/common/views/BasicMainView.module.css';
import styleModule from "./BudgetWorksheet.module.css";

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
    modeViewModel: IBasicModeViewModel;
    style: ICommonStyle;
}

const ModeView = ({ modeViewModel, style }: IModeViewProps) => {
    const SelectedModeView = modeViews[modeViewModel.entity][modeViewModel.mode];
    return (
        <SelectedModeView dataContext={modeViewModel} style={style} />
    );
}

export default function BudgetWorksheetView({ dataContext }: IFactoryViewProps) {

    const viewModel = dataContext() as IBudgetWorksheetViewModel;
    const style = styleModule as ICommonStyle;
    const basicStyle = basicStyleModule as ICommonStyle;

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
                                    style={style} />
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
                <Modal className={style.modal_theme}>
                    <ModeView modeViewModel={viewModel.modeViewModel} style={basicStyle} />
                </Modal>
            }
        </>
    );
}
