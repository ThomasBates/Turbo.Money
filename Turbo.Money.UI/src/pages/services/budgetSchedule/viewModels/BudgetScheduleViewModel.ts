import { useState } from 'react';

import IBasicDataProvider from 'data/interfaces/basic/IBasicDataProvider';

import { BudgetScheduleType } from 'models/budget/BudgetScheduleType';
import { WeekDay } from 'models/general/WeekDay';
import IBudgetSchedule from 'models/budget/IBudgetSchedule';

import ILoggerService from 'services/logger/ILoggerService';
import IErrorService from 'services/errors/IErrorService';

import IBudgetScheduleViewModel from './IBudgetScheduleViewModel';

export default function BudgetScheduleViewModel(
    logger: ILoggerService,
    _errors: IErrorService,
    budgetScheduleDataProvider: IBasicDataProvider<IBudgetSchedule>
): IBudgetScheduleViewModel {
    const module = BudgetScheduleViewModel.name;
    const category = 'BudgetSchedule';

    const defaultSchedule: IBudgetSchedule = {
        id: -1,
        type: BudgetScheduleType.Monthly,
        multiple: 1,
        weekDay: WeekDay.Sunday,
        monthDays: '1',
        yearDates: '01-01',
    };

    const [schedule, setSchedule] = useState<IBudgetSchedule>(defaultSchedule);
    const [isDirty, setIsDirty] = useState<boolean>(true);

    const typeList = [
        BudgetScheduleType.Daily,
        BudgetScheduleType.Weekly,
        BudgetScheduleType.Monthly,
        BudgetScheduleType.Yearly,
        BudgetScheduleType.Arbitrary
    ];
    const weekDayList = [
        WeekDay.Sunday,
        WeekDay.Monday,
        WeekDay.Tuesday,
        WeekDay.Wednesday,
        WeekDay.Thursday,
        WeekDay.Friday,
        WeekDay.Saturday,
    ];

    const isScheduleTypeValid = true;
    const isMultipleValid = true;
    const isWeekDayValid = true;
    const isMonthDaysValid = true;
    const isYearDatesValid = true;

    const canSubmit =
        isDirty &&
        isScheduleTypeValid &&
        isMultipleValid &&
        isWeekDayValid &&
        isMonthDaysValid &&
        isYearDatesValid;

    const initializeData = async (): Promise<void> => {
        const context = `${module}.${initializeData.name}`;
        try {
            const response = await budgetScheduleDataProvider.getAll();
            logger.debug(category, context, 'response.data =', response.data);
            if (response.data.length > 0) {
                setSchedule(response.data[0]);
                setIsDirty(false);
            }
        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
        }
    }

    const setProperty = (name: string, value: string | string[] | number) => {
        setSchedule(prev => ({ ...prev, [name]: value }));
        setIsDirty(true);
    };

    const submit = async (): Promise<void> => {
        if (!canSubmit)
            return;

        if (schedule.id < 0)
            await budgetScheduleDataProvider.create(schedule);
        else
            await budgetScheduleDataProvider.update(schedule.id, schedule);

        await initializeData();
    }

    return {
        title: 'Budget Schedule',

        typeList,
        weekDayList,

        schedule,

        isScheduleTypeValid,
        isMultipleValid,
        isWeekDayValid,
        isMonthDaysValid,
        isYearDatesValid,

        canSubmit,

        initializeData,
        setProperty,
        submit,
    };
}
