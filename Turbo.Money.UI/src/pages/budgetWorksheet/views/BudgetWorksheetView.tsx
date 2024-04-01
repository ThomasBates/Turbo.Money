import React, { useEffect, useState } from "react";

import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

import BudgetSectionDetailsView from "setup/budgetSection/views/BudgetSectionDetailsView";
import BudgetSectionEditView from "setup/budgetSection/views/BudgetSectionEditView";
import BudgetCategoryDetailsView from "setup/budgetCategory/views/BudgetCategoryDetailsView";
import BudgetCategoryEditView from "setup/budgetCategory/views/BudgetCategoryEditView";
import BudgetAccountDetailsView from "setup/budgetAccount/views/BudgetAccountDetailsView";
import BudgetAccountEditView from "setup/budgetAccount/views/BudgetAccountEditView";

import BudgetWorksheetMenu from "../components/BudgetWorksheetMenuDropdown";
import BudgetWorksheetMenuItem from "../components/BudgetWorksheetMenuDropdownItem";

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

function Menu({ viewModel }) {
    return (
        <BudgetWorksheetMenu tooltip="Budget Actions" >
            <BudgetWorksheetMenuItem
                icon="add"
                text="Create New Budget Section"
                onClick={viewModel.addSection} />
            <BudgetWorksheetMenuItem
                icon="load"
                text="Reload Budget"
                onClick={viewModel.loadBudget} />
            <BudgetWorksheetMenuItem
                icon="save"
                text="Save Budget"
                onClick={viewModel.saveBudget} />
        </BudgetWorksheetMenu>
    );
};

export default function BudgetWorksheetView({ viewModel }) {
    viewModel = viewModel();
    const query = window.matchMedia("(min-width:641px)");
    const [wide, setWide] = useState(query.matches);
    useEffect(() => {
        query.addEventListener("change", e => setWide(e.matches));
    }, []);

    return (
        <>
            <div>
                <Table size="sm" variant="dark" responsive borderless hover> 
                {/*<Table size="sm" variant="dark" responsive bordered hover>*/}
                    <tbody>
                        <tr>
                            <td colSpan={6} className="tb-worksheet-title"><h1>{viewModel.title}</h1></td>
                        </tr>
                        <tr>
                            <td colSpan={3}></td>
                            <td className="tb-worksheet-currency">{viewModel.total}</td>
                            <td className="tb-worksheet-text">{(wide ? "Budget " : "") + (viewModel.total < 0 ? "Deficit" : "Surplus")}</td>
                            <td className="tb-worksheet-buttons">
                                <Menu viewModel={viewModel} />
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
                                <Menu viewModel={viewModel} />
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>

            {viewModel.modeViewModel &&       //  backdrop="static"
                <Modal show={true} centered animation={false}>
                    <Modal.Body>
                        <ModeView viewModel={viewModel.modeViewModel} />
                    </Modal.Body>
                </Modal>
            }
        </>
    );
};
