import { useEffect } from "react";

import ICommonStyle from "common/views/ICommonStyle";
import IFactoryViewProps from "common/views/IFactoryViewProps";

import { BudgetScheduleType } from "models/budget/BudgetScheduleType";

import { combineStyles } from "services/tools/tools";

import IBudgetScheduleViewModel from "../viewModels/IBudgetScheduleViewModel";

import styleModule from "./BudgetSchedule.module.css";

export default function BudgetScheduleView({ dataContext }: IFactoryViewProps) {
    const viewModel = dataContext() as IBudgetScheduleViewModel
    const style = styleModule as ICommonStyle;

    useEffect(() => {
        viewModel.initializeData();
    }, []);

    const onSelectChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
        viewModel.setProperty(event.currentTarget.name, event.currentTarget.value)
    }

    const onInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        viewModel.setProperty(event.currentTarget.name, event.currentTarget.value)
    }

    const onSubmitClicked = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        viewModel.submit();
    }

    return (
        <>
            <div className={style.title}><h1>{viewModel.title}</h1></div>
            <form className={style.schedule_form}>
                <table className={style.schedule_table}>
                    <tbody>
                        <tr>
                            <td className={style.schedule_label}>
                                Schedule Type
                            </td>
                            <td className={style.schedule_control}>
                                <select
                                    name="type"
                                    value={viewModel.schedule.type}
                                    onChange={onSelectChanged}
                                >
                                    {viewModel.typeList.map(option => (
                                        <option
                                            value={option}
                                            key={option}
                                        >
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        {viewModel.schedule.type == BudgetScheduleType.Daily && (
                            <>
                                <tr>
                                    <td className={style.schedule_label}>
                                        Multiplier (i.e. "every X days")
                                    </td>
                                    <td className={style.schedule_control}>
                                        <input
                                            type="number"
                                            name="multiple"
                                            value={viewModel.schedule.multiple}
                                            onChange={onInputChanged} />
                                    </td>
                                </tr>
                            </>
                        )}
                        {viewModel.schedule.type == BudgetScheduleType.Weekly && (
                            <>
                                <tr>
                                    <td className={style.schedule_label}>
                                        Multiplier (i.e. "every X weeks")
                                    </td>
                                    <td className={style.schedule_control}>
                                        <input
                                            type="number"
                                            name="multiple"
                                            value={viewModel.schedule.multiple}
                                            onChange={onInputChanged} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className={style.schedule_label}>
                                        Day of the week
                                    </td>
                                    <td className={style.schedule_control}>
                                        <select
                                            name="weekDay"
                                            value={viewModel.schedule.weekDay}
                                            onChange={onSelectChanged}
                                        >
                                            {viewModel.weekDayList.map(option => (
                                                <option
                                                    value={option}
                                                    key={option}
                                                >
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                            </>
                        )}
                        {viewModel.schedule.type == BudgetScheduleType.Monthly && (
                            <>
                                <tr>
                                    <td className={style.schedule_label}>
                                        Multiplier (i.e. "every X months")
                                    </td>
                                    <td className={style.schedule_control}>
                                        <input
                                            type="number"
                                            name="multiple"
                                            value={viewModel.schedule.multiple}
                                            onChange={onInputChanged} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className={style.schedule_label}>
                                        Day(s) of the month (e.g. "15,last")
                                    </td>
                                    <td className={style.schedule_control}>
                                        <input
                                            type="text"
                                            name="monthDays"
                                            value={viewModel.schedule.monthDays}
                                            onChange={onInputChanged} />
                                    </td>
                                </tr>
                            </>
                        )}
                        {viewModel.schedule.type == BudgetScheduleType.Yearly && (
                            <>
                                <tr>
                                    <td className={style.schedule_label}>
                                        Multiplier (i.e. "every X years")
                                    </td>
                                    <td className={style.schedule_control}>
                                        <input
                                            type="number"
                                            name="multiple"
                                            value={viewModel.schedule.multiple}
                                            onChange={onInputChanged} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className={style.schedule_label}>
                                        Date(s) of the year (e.g. "05-15,11-15")
                                    </td>
                                    <td className={style.schedule_control}>
                                        <input
                                            type="text"
                                            name="yearDates"
                                            value={viewModel.schedule.yearDates}
                                            onChange={onInputChanged} />
                                    </td>
                                </tr>
                            </>
                        )}
                        {viewModel.schedule.type == BudgetScheduleType.Arbitrary && (
                            <>
                            </>
                        )}
                        <tr>
                            <td />
                            <td>
                                <button
                                    className={combineStyles(viewModel.canSubmit
                                        ? style.button_control
                                        : style.disabled_button_control,
                                        style.submit_button)}
                                    onClick={onSubmitClicked}
                                    disabled={!viewModel.canSubmit}
                                >
                                    Save
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </>
    );
}
