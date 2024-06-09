
import ICommonStyle from "common/views/ICommonStyle";
import IFactoryViewProps from "common/views/IFactoryViewProps";

import Modal from 'controls/modal/Modal';

import basicStyleModule from 'pages/basic/common/views/BasicMainView.module.css';
import BudgetAccountDetailsView from "pages/basic/budgetAccount/views/BudgetAccountDetailsView";
import BudgetAccountEditView from "pages/basic/budgetAccount/views/BudgetAccountEditView";
import BudgetCategoryDetailsView from "pages/basic/budgetCategory/views/BudgetCategoryDetailsView";
import BudgetCategoryEditView from "pages/basic/budgetCategory/views/BudgetCategoryEditView";
import BudgetSectionDetailsView from "pages/basic/budgetSection/views/BudgetSectionDetailsView";
import BudgetSectionEditView from "pages/basic/budgetSection/views/BudgetSectionEditView";
import BudgetPeriodDetailsView from "pages/basic/budgetPeriod/views/BudgetPeriodDetailsView";
import BudgetPeriodEditView from "pages/basic/budgetPeriod/views/BudgetPeriodEditView";

import IBasicModeViewModel from "pages/basic/common/viewModels/IBasicModeViewModel";

import IBudgetWorksheetMainViewModel from "../viewModels/IBudgetWorksheetMainViewModel";

import styleModule from "./BudgetWorksheet.module.css";
import BudgetWorksheetPeriodView from "./BudgetWorksheetPeriodView";
import BudgetWorksheetBudgetView from "./BudgetWorksheetBudgetView";

import IBudgetWorksheetModeViews from "./IBudgetWorksheetModeViews";

const modeViews: Record<string, IBudgetWorksheetModeViews> = {
    BudgetPeriod: {
        add: BudgetPeriodEditView,
        edit: BudgetPeriodEditView,
        show: BudgetPeriodDetailsView,
        delete: BudgetPeriodDetailsView,
    },
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

export default function BudgetWorksheetMainView({ dataContext }: IFactoryViewProps) {

    const viewModel = dataContext() as IBudgetWorksheetMainViewModel;
    const style = styleModule as ICommonStyle;
    const basicStyle = basicStyleModule as ICommonStyle;

    return (
        <>
            <div className={style.title}><h1>{viewModel.title}</h1></div>

            <BudgetWorksheetPeriodView style={style} dataContext={viewModel.periodDataContext} />

            {viewModel.selectedPeriod ? (
                <BudgetWorksheetBudgetView style={style} dataContext={viewModel.budgetDataContext} />
            ) : (
                <div>No budget period selected</div>
            )}

            {viewModel.modeViewModel &&
                <Modal className={style.modal_theme}>
                    <ModeView modeViewModel={viewModel.modeViewModel} style={basicStyle} />
                </Modal>
            }
        </>
    );
}
