
import IBudgetSchedule from "models/budget/IBudgetSchedule";

export default interface IBudgetScheduleViewModel {
    title: string;

    typeList: string[];
    weekDayList: string[];

    schedule: IBudgetSchedule;

    isScheduleTypeValid: boolean;
    isMultipleValid: boolean;
    isWeekDayValid: boolean;
    isMonthDaysValid: boolean;
    isYearDatesValid: boolean;

    canSubmit: boolean;

    initializeData: () => Promise<void>;

    setProperty: (name: string, value: string | string[] | number) => void;

    submit: () => Promise<void>;
}
