
import { useState } from "react";

import IModelItem from "common/models/IModelItem";

import IBudgetPeriod from "models/budget/IBudgetPeriod";

import BudgetAccountDetailsViewModel from "pages/basic/budgetAccount/viewModels/BudgetAccountDetailsViewModel";
import BudgetAccountEditViewModel from "pages/basic/budgetAccount/viewModels/BudgetAccountEditViewModel";
import BudgetCategoryDetailsViewModel from "pages/basic/budgetCategory/viewModels/BudgetCategoryDetailsViewModel";
import BudgetCategoryEditViewModel from "pages/basic/budgetCategory/viewModels/BudgetCategoryEditViewModel";
import BudgetSectionDetailsViewModel from "pages/basic/budgetSection/viewModels/BudgetSectionDetailsViewModel";
import BudgetSectionEditViewModel from "pages/basic/budgetSection/viewModels/BudgetSectionEditViewModel";
import BudgetPeriodDetailsViewModel from "pages/basic/budgetPeriod/viewModels/BudgetPeriodDetailsViewModel";
import BudgetPeriodEditViewModel from "pages/basic/budgetPeriod/viewModels/BudgetPeriodEditViewModel";

import IBasicModeViewModelProps from "pages/basic/common/viewModels/IBasicModeViewModelProps";
import IBasicEditViewModel from "pages/basic/common/viewModels/IBasicEditViewModel";
import IBasicModeViewModel from "pages/basic/common/viewModels/IBasicModeViewModel";
import IBasicDetailsViewModel from "pages/basic/common/viewModels/IBasicDetailsViewModel";

import ILoggerService from "services/logger/ILoggerService";

import IBudgetWorksheetDataService from "../data/IBudgetWorksheetDataService";

import IBudgetWorksheetMainViewModel from "./IBudgetWorksheetMainViewModel";
import BudgetWorksheetPeriodViewModel from "./BudgetWorksheetPeriodViewModel";
import BudgetWorksheetBudgetViewModel from "./BudgetWorksheetBudgetViewModel";

interface IBasicModeViewModels {
    add: (props: IBasicModeViewModelProps) => IBasicEditViewModel;
    edit: (props: IBasicModeViewModelProps) => IBasicEditViewModel;
    show: (props: IBasicModeViewModelProps) => IBasicDetailsViewModel;
    delete: (props: IBasicModeViewModelProps) => IBasicDetailsViewModel;

    [key: string]: (props: IBasicModeViewModelProps) => IBasicModeViewModel;
}

const modeViewModels: Record<string, IBasicModeViewModels> = {
    BudgetPeriod: {
        add: BudgetPeriodEditViewModel,
        edit: BudgetPeriodEditViewModel,
        show: BudgetPeriodDetailsViewModel,
        delete: BudgetPeriodDetailsViewModel,
    },
    BudgetSection: {
        add: BudgetSectionEditViewModel,
        edit: BudgetSectionEditViewModel,
        show: BudgetSectionDetailsViewModel,
        delete: BudgetSectionDetailsViewModel,
    },
    BudgetCategory: {
        add: BudgetCategoryEditViewModel,
        edit: BudgetCategoryEditViewModel,
        show: BudgetCategoryDetailsViewModel,
        delete: BudgetCategoryDetailsViewModel,
    },
    BudgetAccount: {
        add: BudgetAccountEditViewModel,
        edit: BudgetAccountEditViewModel,
        show: BudgetAccountDetailsViewModel,
        delete: BudgetAccountDetailsViewModel,
    }
}

export default function BudgetWorksheetMainViewModel(
    logger: ILoggerService,
    dataService: IBudgetWorksheetDataService
): IBudgetWorksheetMainViewModel {

    const [modeViewModelProps, setModeViewModelPropsState] = useState<null | IBasicModeViewModelProps>(null);
    const [, setModeItemState] = useState<null | IModelItem>(null);

    const setModeItem = (item: IModelItem | null): void => {
        setModeItemState(item);
        setModeViewModelPropsState(prevProps => prevProps
            ? {
                ...prevProps,
                item: item
            }
            : prevProps);
    }

    const setModeViewModelProps = (props: null | IBasicModeViewModelProps): void => {
        setModeViewModelPropsState(props);
    }

    const [selectedPeriod, setSelectedPeriod] = useState<null | IBudgetPeriod>(null);

    const handlePeriodSelected = async (selectedPeriod: IBudgetPeriod): Promise<void> => {
        setSelectedPeriod(selectedPeriod);
        await dataService.loadBudgetWorksheet(selectedPeriod.id);
    }

    const periodDataContext = (): object => {
        return BudgetWorksheetPeriodViewModel(logger, dataService, handlePeriodSelected, setModeItem, setModeViewModelProps);
    }

    const budgetDataContext = (): object => {
        return BudgetWorksheetBudgetViewModel(logger, dataService, selectedPeriod, setModeItem, setModeViewModelProps);
    }

    const modeViewModel = modeViewModelProps &&
        modeViewModels[modeViewModelProps.entity][modeViewModelProps.mode](modeViewModelProps);

    return {
        title: "Budget Worksheet",
        selectedPeriod,
        modeViewModel,

        periodDataContext,
        budgetDataContext,
    }
}

