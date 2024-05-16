import { useState } from "react";

import ISelectOption from "common/views/ISelectOption";

import IBudgetPeriod from "models/budget/IBudgetPeriod";

import ILoggerService from "services/logger/ILoggerService";

import IBudgetWorksheetDataService from "../data/IBudgetWorksheetDataService";

import IBudgetWorksheetPeriodViewModel from "./IBudgetWorksheetPeriodViewModel";

interface IPeriodLookup {
    [key: string]: IBudgetPeriod;
}

export default function BudgetWorksheetPeriodViewModel(
    logger: ILoggerService,
    dataService: IBudgetWorksheetDataService,
    onPeriodSelected: (budgetPeriod: IBudgetPeriod) => void
): IBudgetWorksheetPeriodViewModel {
    const module = BudgetWorksheetPeriodViewModel.name;
    const category = 'BudgetWorksheet';

    const [selectedPeriod, setSelectedPeriod] = useState<null | IBudgetPeriod>(null);
    const [periodOptionList, setPeriodOptionList] = useState<ISelectOption[]>([]);
    const [periodLookup, ] = useState<IPeriodLookup>({});

    const initializeData = async () => {
        const context = `${module}.${initializeData.name}`;

        const budgetPeriodList = await dataService.getBudgetPeriodList();
        logger.debug(category, context, 'budgetPeriodList =', budgetPeriodList);

        const optionList = budgetPeriodList.map(budgetPeriod => {
            periodLookup[String(budgetPeriod.id)] = budgetPeriod;
            return {
                value: String(budgetPeriod.id),
                text: budgetPeriod.name || `${budgetPeriod.start} to ${budgetPeriod.end}`
            };
        });
        logger.debug(category, context, 'optionList =', optionList);
        setPeriodOptionList(optionList);
        //setPeriodOptionList([
        //    { value: '1', text: 'One' },
        //    { value: '2', text: 'Two' },
        //    { value: '3', text: 'Three' }
        //]);

        if (budgetPeriodList.length > 0) {
            const now = new Date();
            let initialPeriod = budgetPeriodList.find(period => period.start <= now && now <= period.end);
            if (!initialPeriod)
                initialPeriod = budgetPeriodList[0];
            setSelectedPeriod(initialPeriod);
            await onPeriodSelected(initialPeriod);
        }
    }

    const selectPeriod = async (value: string) => {
        const budgetPeriod = periodLookup[value];
        setSelectedPeriod(budgetPeriod);
        await onPeriodSelected(budgetPeriod);
    }

    logger.debug(category, module, 'periodOptionList =', periodOptionList);

    return {
        periodOptionList/*: [
            { value: '1', text: 'One' },
            { value: '2', text: 'Two' },
            { value: '3', text: 'Three' }
        ]*/,
        selectedPeriod: String(selectedPeriod?.id),

        initializeData,
        selectPeriod,
    }
}

