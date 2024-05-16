
import IBudgetPeriod from "models/budget/IBudgetPeriod";

export default interface IBudgetWorksheetMainViewModel {
    title: string;
    selectedPeriod: null | IBudgetPeriod;

    //initializeData: () => void;
    periodDataContext: () => object;
    budgetDataContext: () => object;
//    periodDataContext: object;
//    budgetDataContext: object;
}