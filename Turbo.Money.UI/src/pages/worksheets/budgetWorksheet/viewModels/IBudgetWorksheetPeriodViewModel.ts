
import ISelectOption from "common/views/ISelectOption";
import IBudgetPeriod from "../../../../models/budget/IBudgetPeriod";

export default interface IBudgetWorksheetPeriodViewModel {
    periodSetList: ISelectOption[];
    periodSet: string;
    periodOptionList: ISelectOption[];
    selectedPeriod: string;
    period: null | IBudgetPeriod;

    selectPeriodSet: (value: string) => Promise<void>;
    selectPeriod: (value: string) => Promise<void>;
    createPeriod: () => void;
    updatePeriod: () => void;
    deletePeriod: () => void;
}