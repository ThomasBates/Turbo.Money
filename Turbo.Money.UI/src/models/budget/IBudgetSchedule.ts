
import { WeekDay } from "../general/WeekDay";
import { BudgetScheduleType } from "./BudgetScheduleType";

export default interface IBudgetSchedule {
    id: number;
    type: BudgetScheduleType;
    multiple?: number,
    weekDay?: WeekDay,
    monthDays?: string,
    yearDates?: string,
}
