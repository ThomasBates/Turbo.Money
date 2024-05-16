
import { useState } from "react";

import IModelItem from "common/models/IModelItem";

import IBudgetSection from 'models/budget/IBudgetSection';
import IBudgetPeriod from 'models/budget/IBudgetPeriod';

import BudgetAccountDetailsViewModel from "pages/basic/budgetAccount/viewModels/BudgetAccountDetailsViewModel";
import BudgetAccountEditViewModel from "pages/basic/budgetAccount/viewModels/BudgetAccountEditViewModel";
import BudgetCategoryDetailsViewModel from "pages/basic/budgetCategory/viewModels/BudgetCategoryDetailsViewModel";
import BudgetCategoryEditViewModel from "pages/basic/budgetCategory/viewModels/BudgetCategoryEditViewModel";
import BudgetSectionDetailsViewModel from "pages/basic/budgetSection/viewModels/BudgetSectionDetailsViewModel";
import BudgetSectionEditViewModel from "pages/basic/budgetSection/viewModels/BudgetSectionEditViewModel";

import IBasicModeViewModelProps from "pages/basic/common/viewModels/IBasicModeViewModelProps";
import IBasicEditViewModel from "pages/basic/common/viewModels/IBasicEditViewModel";
import IBasicModeViewModel from "pages/basic/common/viewModels/IBasicModeViewModel";
import IBasicDetailsViewModel from "pages/basic/common/viewModels/IBasicDetailsViewModel";

import ILoggerService from "services/logger/ILoggerService";

import IBudgetWorksheetDataService from "../data/IBudgetWorksheetDataService";

import BudgetWorksheetSectionViewModel from "./BudgetWorksheetSectionViewModel";
import IBudgetWorksheetBudgetViewModel from "./IBudgetWorksheetBudgetViewModel";

interface IBasicModeViewModels {
    add: (props: IBasicModeViewModelProps) => IBasicEditViewModel;
    edit: (props: IBasicModeViewModelProps) => IBasicEditViewModel;
    show: (props: IBasicModeViewModelProps) => IBasicDetailsViewModel;
    delete: (props: IBasicModeViewModelProps) => IBasicDetailsViewModel;

    [key: string]: (props: IBasicModeViewModelProps) => IBasicModeViewModel;
}

const modeViewModels: Record<string, IBasicModeViewModels> = {
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

export default function BudgetWorksheetBudgetViewModel(
    logger: ILoggerService,
    dataService: IBudgetWorksheetDataService,
    selectedPeriod: null | IBudgetPeriod,
): IBudgetWorksheetBudgetViewModel {

    const [modeViewModelProps, setModeViewModelProps] = useState<null | IBasicModeViewModelProps>(null);
    //const [selectedPeriod, setSelectedPeriod] = useState<null | IBudgetPeriod>(null);

    const [, setModeItem] = useState<null | IModelItem>(null);

    const internalSetModeItem = (item: IModelItem | null): void => {
        setModeItem(item);
        setModeViewModelProps(prevProps => prevProps
            ? {
                ...prevProps,
                item: item
            }
            : prevProps);
    }

    const internalSetModeViewModelProps = (props: null | IBasicModeViewModelProps): void => {
        setModeViewModelProps(props);
    }

    const sectionViewModels = dataService.listBudgetSections()
        .map(section => BudgetWorksheetSectionViewModel(
            logger,
            section,
            dataService,
            internalSetModeItem,
            internalSetModeViewModelProps));

    const loadBudgetWorksheet = async () => {
        if (selectedPeriod && selectedPeriod.id > 0)
            await dataService.loadBudgetWorksheet(selectedPeriod.id);
    };

    const saveBudgetWorksheet = async () => {
        await dataService.saveBudgetWorksheet();
    };

    const addSection = () => {
        const sectionToAdd = {
            id: -1,
            name: "",
            description: "",
            direction: "out"
        };
        internalSetModeItem(sectionToAdd);
        internalSetModeViewModelProps({
            title: "Budget Section",
            entity: "BudgetSection",
            mode: "add",
            item: sectionToAdd,
            setItem: internalSetModeItem,
            list: dataService.listBudgetSectionNames(),
            onSubmitted: onAddSubmitted,
            onCancelled: onAddCancelled,
        });
    };

    const onAddSubmitted = (item: IModelItem) => {
        dataService.createBudgetSection(item as IBudgetSection);
        internalSetModeViewModelProps(null);
    };

    const onAddCancelled = () => {
        internalSetModeViewModelProps(null);
    };

    const modeViewModel = modeViewModelProps &&
        modeViewModels[modeViewModelProps.entity][modeViewModelProps.mode](modeViewModelProps);

    return {
        title: "Budget Worksheet",
        selectedPeriod,
        sectionViewModels,
        modeViewModel,
        total: dataService.getBudgetTotalAbsolute(),
        status: dataService.getBudgetStatus(),

        //setSelectedPeriod,
        loadBudgetWorksheet,
        saveBudgetWorksheet,
        addSection
    }
}

