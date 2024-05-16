
import { useState } from "react";

import IBudgetPeriod from "models/budget/IBudgetPeriod";

import ILoggerService from "services/logger/ILoggerService";

import IBudgetWorksheetDataService from "../data/IBudgetWorksheetDataService";

import IBudgetWorksheetMainViewModel from "./IBudgetWorksheetMainViewModel";
import BudgetWorksheetPeriodViewModel from "./BudgetWorksheetPeriodViewModel";
import BudgetWorksheetBudgetViewModel from "./BudgetWorksheetBudgetViewModel";

export default function BudgetWorksheetMainViewModel(
    logger: ILoggerService,
    dataService: IBudgetWorksheetDataService
): IBudgetWorksheetMainViewModel {

    const [selectedPeriod, setSelectedPeriod] = useState<null | IBudgetPeriod>(null);

    const handlePeriodSelected = async (selectedPeriod: IBudgetPeriod): Promise<void> => {
        setSelectedPeriod(selectedPeriod);
        await dataService.loadBudgetWorksheet(selectedPeriod.id);
    }

    const periodDataContext = (): object => {
        return BudgetWorksheetPeriodViewModel(logger, dataService, handlePeriodSelected);
    }

    const budgetDataContext = (): object => {
        return BudgetWorksheetBudgetViewModel(logger, dataService, selectedPeriod);
    }

    return {
        title: "Budget Worksheet",
        selectedPeriod,

        periodDataContext,
        budgetDataContext,
    }
}

