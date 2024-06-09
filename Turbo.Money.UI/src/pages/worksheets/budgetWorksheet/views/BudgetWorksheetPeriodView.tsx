import { useState } from "react";

import IStyledFactoryViewProps from "common/views/IStyledFactoryViewProps";

import { formatDate } from "services/tools/tools";

import IBudgetWorksheetPeriodViewModel from "../viewModels/IBudgetWorksheetPeriodViewModel";

export default function BudgetWorksheetPeriodView({ style, dataContext }: IStyledFactoryViewProps) {

    const viewModel = dataContext() as IBudgetWorksheetPeriodViewModel;

    const [showDetails, setShowDetails] = useState(false);

    const onPeriodSetChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
        viewModel.selectPeriodSet(event.currentTarget.value)
    }

    const onPeriodChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
        viewModel.selectPeriod(event.currentTarget.value)
    }

    return (
        <div>
            {!showDetails ? (<>
                <table>
                    <tbody>
                        <tr>
                            <td>Budget Period:</td>
                            <td>
                                {viewModel.period && (viewModel.periodSet == 'sandbox'
                                    ? `${viewModel.period.name} (${viewModel.period.description})`
                                    : `${formatDate(viewModel.period.start)} to ${formatDate(viewModel.period.end)}`)}
                            </td>
                            <td>({viewModel.periodSet})</td>
                            <td>
                                <button
                                    onClick={() => setShowDetails(true)}
                                >
                                    Show Details
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </>) : (<>
                <form className={style.period_form}>
                    <table className={style.period_table}>
                        <tbody>
                            <tr>
                                <td className={style.period_label}>
                                    Budget Periods
                                </td>
                                <td className={style.period_control}>
                                    <select
                                        name="periodSet"
                                        value={viewModel.periodSet}
                                        onChange={onPeriodSetChanged}
                                    >
                                        {viewModel.periodSetList.map(periodSet => (
                                            <option
                                                value={periodSet.value}
                                                key={periodSet.value}
                                            >
                                                {periodSet.text}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
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
                <div>
                    <table>
                        <tbody>
                            {viewModel.periodSet == 'sandbox'
                                ? (<>
                                    <tr>
                                        <td>Period Name:</td>
                                        <td>{viewModel.period?.name}</td>
                                    </tr>
                                    <tr>
                                        <td>Description:</td>
                                        <td>{viewModel.period?.description}</td>
                                    </tr>
                                </>) : (<>
                                    <tr>
                                        <td>Period Start:</td>
                                        <td>{!viewModel.period || formatDate(viewModel.period.start)}</td>
                                    </tr>
                                    <tr>
                                        <td>Period End:</td>
                                        <td>{!viewModel.period || formatDate(viewModel.period.end)}</td>
                                    </tr>
                                </>)}
                        </tbody>
                    </table>
                </div>
                <div>
                    <button
                        onClick={() => setShowDetails(false)}
                    >
                        Hide Details
                    </button>
                    <button
                        onClick={viewModel.createPeriod}
                    >
                        Create new budget period
                    </button>
                    <button
                        onClick={viewModel.updatePeriod}
                    >
                        Modify this budget period
                    </button>
                    <button
                        onClick={viewModel.deletePeriod}
                    >
                        Delete this budget period
                    </button>
                </div>
            </>)}
        </div>
    );
}
