import React from "react";

import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

import BudgetSectionDetailsView from "../../../setup/budgetSection/views/BudgetSectionDetailsView";
import BudgetSectionEditView from "../../../setup/budgetSection/views/BudgetSectionEditView";
import BudgetCategoryDetailsView from "../../../setup/budgetCategory/views/BudgetCategoryDetailsView";
import BudgetCategoryEditView from "../../../setup/budgetCategory/views/BudgetCategoryEditView";
import BudgetAccountDetailsView from "../../../setup/budgetAccount/views/BudgetAccountDetailsView";
import BudgetAccountEditView from "../../../setup/budgetAccount/views/BudgetAccountEditView";

import BudgetWorksheetButton from "../components/BudgetWorksheetButton";

import BudgetWorksheetSectionView from "./BudgetWorksheetSectionView";

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
    //console.log(`ModeView: viewModel: `, viewModel);
    //if (!viewModel)
    //    return null;

    //const entitySet = modeViews[viewModel.entity];
    //console.log(`ModeView: entitySet: `, entitySet);

    //if (!entitySet)
    //    return null;

    //const modeView = entitySet[viewModel.mode];
    //console.log(`ModeView: modeView: `, modeView);

    //return modeView({ viewModel })

    return modeViews[viewModel.entity][viewModel.mode]({ viewModel })
};

const BudgetWorksheetView = ({ viewModel }) => {
    return (
        <div className="app">
            <h1>{viewModel.title}</h1>
            <Table size="sm" variant="dark" responsive borderless hover>
                <tbody>
                    {viewModel.sectionViewModels &&
                        viewModel.sectionViewModels.map(vm => (
                            <BudgetWorksheetSectionView key={vm.name} viewModel={vm} />
                        ))
                    }

                    <tr>
                        <td colSpan={6} className="tb-worksheet-buttons">
                            <BudgetWorksheetButton
                                type="add"
                                placement="left"
                                tooltip="Create New Budget Section"
                                onClick={viewModel.addSection} />
                        </td>
                    </tr>
                </tbody>
            </Table>

            {viewModel.modeViewModel &&       //  backdrop="static"
                <Modal show={true} centered animation={false}>
                    <Modal.Body>
                        <ModeView viewModel={viewModel.modeViewModel} />
                    </Modal.Body>
                </Modal>
            }
        </div>
    );
};

export default BudgetWorksheetView;