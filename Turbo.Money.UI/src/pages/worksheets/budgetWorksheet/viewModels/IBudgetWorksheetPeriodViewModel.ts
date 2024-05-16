
import ISelectOption from "common/views/ISelectOption";

export default interface IBudgetWorksheetPeriodViewModel {
    periodOptionList: ISelectOption[];
    selectedPeriod: string;

    initializeData: () => Promise<void>;
    selectPeriod: (value: string) => Promise<void>;
}