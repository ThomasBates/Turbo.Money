import { useEffect, useState } from "react";

import IModelItem from "common/models/IModelItem";

import ISelectOption from "common/views/ISelectOption";

import IBudgetPeriod from "models/budget/IBudgetPeriod";

import IBasicModeViewModelProps from "pages/basic/common/viewModels/IBasicModeViewModelProps";

import ILoggerService from "services/logger/ILoggerService";
import { formatDate } from "services/tools/tools";

import IBudgetWorksheetDataService from "../data/IBudgetWorksheetDataService";

import IBudgetWorksheetPeriodViewModel from "./IBudgetWorksheetPeriodViewModel";

interface IPeriodLookup {
    [key: string]: IBudgetPeriod;
}

export default function BudgetWorksheetPeriodViewModel(
    logger: ILoggerService,
    dataService: IBudgetWorksheetDataService,
    onPeriodSelected: (budgetPeriod: IBudgetPeriod) => void,
    setModeItem: (item: IModelItem | null) => void,
    setModeViewModelProps: (props: null | IBasicModeViewModelProps) => void,
): IBudgetWorksheetPeriodViewModel {
    const module = BudgetWorksheetPeriodViewModel.name;
    const category = 'BudgetWorksheet';

    const [periodSet, setPeriodSet] = useState('open');
    const [period, setPeriod] = useState<null | IBudgetPeriod>(null);
    const [periodOptionList, setPeriodOptionList] = useState<ISelectOption[]>([]);
    const [periodLookup] = useState<IPeriodLookup>({});
    const [returnId, setReturnId] = useState<number | null>(null);

    useEffect(() => {
        (async () => {
            await loadData();
        })();
    }, [periodSet]);

    const periodSetList = [
        { value: 'open', text: 'Open Budget Periods' },
        { value: 'closed', text: 'Closed Budget Periods' },
        { value: 'sandbox', text: 'Budget Period Sandbox' },
    ];

    const compareName = (a: IBudgetPeriod, b: IBudgetPeriod) => {
        if (a.name < b.name)
            return -1;
        if (a.name > b.name)
            return 1;
        return 0;
    }

    const compareStart = (a: IBudgetPeriod, b: IBudgetPeriod) => {
        if (a.start < b.start)
            return -1;
        if (a.start > b.start)
            return 1;
        return 0;
    }

    const loadData = async () => {
        const context = `${module}.${loadData.name}`;

        const budgetPeriodList = await dataService.loadBudgetPeriods(periodSet);
        logger.debug(category, context, 'budgetPeriodList =', budgetPeriodList);

        const sortedList = (periodSet == 'sandbox')
            ? budgetPeriodList.sort(compareName)
            : budgetPeriodList.sort(compareStart);

        const optionList = sortedList.map(budgetPeriod => {
            periodLookup[String(budgetPeriod.id)] = budgetPeriod;
            return {
                value: String(budgetPeriod.id),
                text: (periodSet == 'sandbox')
                    ? budgetPeriod.name
                    : `${formatDate(budgetPeriod.start)} to ${formatDate(budgetPeriod.end)}`
            };
        });

        logger.debug(category, context, 'optionList =', optionList);
        setPeriodOptionList(optionList);

        if (budgetPeriodList.length > 0) {
            if (periodSet != 'open') {
                const initialPeriod = sortedList[0];
                setPeriod(initialPeriod);
                await onPeriodSelected(initialPeriod);
            }
            else {
                const now = new Date();
                now.setTime(now.getTime() - (now.getTimezoneOffset() * 60 * 1000));
                const nowTest = now.toISOString().split('T')[0];

                let initialPeriod = budgetPeriodList.find(period => ((period.start <= nowTest) && (nowTest <= period.end)));
                if (!initialPeriod)
                    initialPeriod = sortedList[0];
                setPeriod(initialPeriod);
                await onPeriodSelected(initialPeriod);
            }
        }
    }

    const selectPeriodSet = async (value: string) => {
        setPeriodSet(value);
    }

    const selectPeriod = async (value: string) => {
        const budgetPeriod = periodLookup[value];
        setPeriod(budgetPeriod);
        await onPeriodSelected(budgetPeriod);
    }

    //  ------------------------------------------------------------------------

    const onModeCancelled = () => {
        set
        setModeViewModelProps(null);
    };

    const createPeriod = () => {
        setReturnId(period ? period.id : null);
        const periodToAdd = {
            id: -1,
            name: "",
            description: "",
            start: "",
            end: "",
            isSandbox: periodSet == 'sandbox',
            isClosed: periodSet == 'closed',
            templateSet: periodSet,
            templateId: "",
        };
        setModeItem(periodToAdd);
        setModeViewModelProps({
            title: "Budget Period",
            entity: "BudgetPeriod",
            mode: "add",
            item: periodToAdd,
            setItem: setModeItem,
            list: dataService.listBudgetPeriods(),
            onSubmitted: onAddSubmitted,
            onCancelled: onAddCancelled,
        });
    };

    const onAddSubmitted = async (item: IModelItem) => {
        const createdPeriod = await dataService.createBudgetPeriod(item as IBudgetPeriod);
        if (!createdPeriod)
            return;
        setReturnId(createdPeriod.id);

        setModeViewModelProps(null);
        await loadData();
        selectPeriod(createdPeriod.id.toString());
    };

    const onAddCancelled = () => {
        setModeViewModelProps(null);
        if (returnId) {
            selectPeriod(returnId.toString());
            setReturnId(null);
        }
    }

    const updatePeriod = () => {
        if (!period)
            return;
        const periodToEdit = {
            id: period.id,
            name: period.name,
            description: period.description,
            start: period.start,
            end: period.end,
            isSandbox: period.isSandbox,
            isClosed: period.isClosed,
        };
        setModeItem(periodToEdit);
        setModeViewModelProps({
            title: "Budget Period",
            entity: "BudgetPeriod",
            mode: "edit",
            item: periodToEdit,
            setItem: setModeItem,
            list: dataService.listBudgetPeriodNames(),
            onSubmitted: onEditSubmitted,
            onCancelled: onModeCancelled
        });
    }

    const onEditSubmitted = async (item: IModelItem) => {
        const updatedPeriod = await dataService.updateBudgetPeriod(item as IBudgetPeriod);
        if (!updatedPeriod)
            return;
        setModeViewModelProps(null);
        await loadData();
        selectPeriod(updatedPeriod.id.toString());
    };

    const deletePeriod = () => {
        if (!period)
            return;
        const periodToDelete = {
            id: period.id,
            name: period.name,
            description: period.description,
            start: period.start,
            end: period.end,
            isSandbox: period.isSandbox,
            isClosed: period.isClosed,
        };
        setModeItem(periodToDelete);
        setModeViewModelProps({
            title: "Budget Period",
            entity: "BudgetPeriod",
            mode: "delete",
            item: periodToDelete,
            onSubmitted: onDeleteSubmitted,
            onCancelled: onModeCancelled
        });
    }

    const onDeleteSubmitted = async (item: IModelItem) => {
        await dataService.deleteBudgetPeriod(item as IBudgetPeriod);
        setModeViewModelProps(null);
        await loadData();
    };

    //  ------------------------------------------------------------------------
    //logger.debug(category, module, 'periodOptionList =', periodOptionList);

    return {
        periodSetList,
        periodSet,
        periodOptionList,
        selectedPeriod: String(period?.id),
        period: period,

        //initializeData,
        selectPeriodSet,
        selectPeriod,
        createPeriod,
        updatePeriod,
        deletePeriod,
    }
}
