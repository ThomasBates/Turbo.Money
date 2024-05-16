import { useEffect } from "react";

import IStyledFactoryViewProps from "common/views/IStyledFactoryViewProps";

import IBudgetWorksheetPeriodViewModel from "../viewModels/IBudgetWorksheetPeriodViewModel";

export default function BudgetWorksheetPeriodView({ style, dataContext }: IStyledFactoryViewProps) {

    const viewModel = dataContext() as IBudgetWorksheetPeriodViewModel;

    useEffect(() => {
        viewModel.initializeData();
    }, []);

    const onPeriodChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
        viewModel.selectPeriod(event.currentTarget.value)
    }

    return (
        <form className={style.period_form}>
            <table className={style.period_table}>
                <tbody>
                    <tr>
                        <td className={style.period_label}>
                            Budget Period
                        </td>
                        <td className={style.period_control}>
                            <select
                                name="period"
                                value={viewModel.selectedPeriod}
                                onChange={onPeriodChanged}
                            >
                                {viewModel.periodOptionList.map(period => (
                                    <option
                                        value={period.value}
                                        key={period.value}
                                    >
                                        {period.text}
                                    </option>
                                ))}
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    );
}
