import IBudgetSchedule from "../../../../models/budget/IBudgetSchedule";

export default interface IBudgetScheduleViewModel {
    title: string;

    typeList: string[];
    weekDayList: string[];

    schedule: IBudgetSchedule;
    //scheduleType: string;
    //multiple?: string;
    //weekDay?: string;
    //monthDays?: string;
    //yearDates?: string;

    isScheduleTypeValid: boolean;
    isMultipleValid: boolean;
    isWeekDayValid: boolean;
    isMonthDaysValid: boolean;
    isYearDatesValid: boolean;

    canSubmit: boolean;

    initializeData: () => Promise<void>;

    setProperty: (name: string, value: string | string[] | number) => void;
    //setScheduleType: (value: string) => void;
    //setMultiple: (value: string) => void;
    //setWeekDay: (value: string) => void;
    //setMonthDays: (value: string) => void;
    //setYearDates: (value: string) => void;

    submit: () => Promise<void>;
}
