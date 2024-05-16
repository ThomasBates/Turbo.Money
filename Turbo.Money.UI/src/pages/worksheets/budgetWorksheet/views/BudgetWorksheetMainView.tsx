
import ICommonStyle from "common/views/ICommonStyle";
import IFactoryViewProps from "common/views/IFactoryViewProps";

import IBudgetWorksheetMainViewModel from "../viewModels/IBudgetWorksheetMainViewModel";

import styleModule from "./BudgetWorksheet.module.css";
import BudgetWorksheetPeriodView from "./BudgetWorksheetPeriodView";
import BudgetWorksheetBudgetView from "./BudgetWorksheetBudgetView";

export default function BudgetWorksheetMainView({ dataContext }: IFactoryViewProps) {

    const viewModel = dataContext() as IBudgetWorksheetMainViewModel;
    const style = styleModule as ICommonStyle;

    return (
        <>
            <div className={style.title}><h1>{viewModel.title}</h1></div>

            <BudgetWorksheetPeriodView style={style} dataContext={viewModel.periodDataContext} />

            {viewModel.selectedPeriod ? (
                <BudgetWorksheetBudgetView style={style} dataContext={viewModel.budgetDataContext} />
            ) : (
                <div>No budget period selected</div>
            )}
        </>
    );
}
