import React, { useEffect, useState } from "react";

import Modal from 'components/modal/Modal';

import BudgetSectionDetailsView from "setup/budgetSection/views/BudgetSectionDetailsView";
import BudgetSectionEditView from "setup/budgetSection/views/BudgetSectionEditView";
import BudgetCategoryDetailsView from "setup/budgetCategory/views/BudgetCategoryDetailsView";
import BudgetCategoryEditView from "setup/budgetCategory/views/BudgetCategoryEditView";
import BudgetAccountDetailsView from "setup/budgetAccount/views/BudgetAccountDetailsView";
import BudgetAccountEditView from "setup/budgetAccount/views/BudgetAccountEditView";

import BudgetWorksheetMenu from '../components/BudgetWorksheetMenu';

import BudgetWorksheetSectionView from "./BudgetWorksheetSectionView";

import "./BudgetWorksheet.css";

const modeViews = {
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

const ModeView = ({ viewModel }) => {
    return modeViews[viewModel.entity][viewModel.mode]({ viewModel })
};

export default function BudgetWorksheetView({ viewModel }) {
    viewModel = viewModel();
    const query = window.matchMedia("(min-width:641px)");
    const [wide, setWide] = useState(query.matches);
    useEffect(() => {
        query.addEventListener("change", e => setWide(e.matches));
    }, []);

    const menuData = {
        content: "root",
        tooltip: "Budget Actions",
        list: [
            { action: viewModel.loadBudget, content: "Reload Budget", icon: "load", },
            { action: viewModel.saveBudget, content: "Save Budget", icon: "save", },
            { action: viewModel.addSection, content: "Create new budget section", icon: "add", },
        ]
    };

    return (
        <>
            <div>
                <table className='tb-worksheet-table'> 
                    <tbody>
                        <tr>
                            <td colSpan={6} className="tb-worksheet-title"><h1>{viewModel.title}</h1></td>
                        </tr>
                        <tr>
                            <td colSpan={3}></td>
                            <td className="tb-worksheet-currency">{viewModel.total}</td>
                            <td className="tb-worksheet-text">{(wide ? "Budget " : "") + (viewModel.total < 0 ? "Deficit" : "Surplus")}</td>
                            <td className="tb-worksheet-buttons">
                                <BudgetWorksheetMenu menuData={menuData} />
                            </td>
                        </tr>

                        {viewModel.sectionViewModels &&
                            viewModel.sectionViewModels.map(vm => (
                                <BudgetWorksheetSectionView key={vm.name} viewModel={vm} />
                            ))
                        }

                        <tr>
                            <td colSpan={3}></td>
                            <td className="tb-worksheet-currency">{viewModel.total}</td>
                            <td className="tb-worksheet-text">{(wide ? "Budget " : "") + (viewModel.total < 0 ? "Deficit" : "Surplus")}</td>
                            <td className="tb-worksheet-buttons">
                                <BudgetWorksheetMenu menuData={menuData} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {viewModel.modeViewModel &&
                <Modal >
                    <ModeView viewModel={viewModel.modeViewModel} />
                </Modal>
            }
        </>
    );
};
