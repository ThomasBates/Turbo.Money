
import { useState } from "react";

import { useAppContext } from 'app/AppContextAccess';

import IBudgetSection from 'models/budget/IBudgetSection';
import ICommonItem from "models/common/ICommonItem";

import BudgetSectionDetailsViewModel from "pages/budget/budgetSection/viewModels/BudgetSectionDetailsViewModel";
import BudgetSectionEditViewModel from "pages/budget/budgetSection/viewModels/BudgetSectionEditViewModel";
import BudgetCategoryDetailsViewModel from "pages/budget/budgetCategory/viewModels/BudgetCategoryDetailsViewModel";
import BudgetCategoryEditViewModel from "pages/budget/budgetCategory/viewModels/BudgetCategoryEditViewModel";
import BudgetAccountDetailsViewModel from "pages/budget/budgetAccount/viewModels/BudgetAccountDetailsViewModel";
import BudgetAccountEditViewModel from "pages/budget/budgetAccount/viewModels/BudgetAccountEditViewModel";

import ICommonModeViewModelProps from "pages/common/viewModels/ICommonModeViewModelProps";
import ICommonEditViewModel from "pages/common/viewModels/ICommonEditViewModel";
import ICommonModeViewModel from "pages/common/viewModels/ICommonModeViewModel";
import ICommonDetailsViewModel from "pages/common/viewModels/ICommonDetailsViewModel";

import { IBudgetItem, IBudgetWorksheetDataService } from "../data/IBudgetWorksheetDataService";
import BudgetWorksheetDataService from "../data/BudgetWorksheetDataService";

import BudgetWorksheetSectionViewModel from "./BudgetWorksheetSectionViewModel";
import IBudgetWorksheetViewModel from "./IBudgetWorksheetViewModel";

interface ICommonModeViewModels {
    add: (props: ICommonModeViewModelProps) => ICommonEditViewModel;
    edit: (props: ICommonModeViewModelProps) => ICommonEditViewModel;
    show: (props: ICommonModeViewModelProps) => ICommonDetailsViewModel;
    delete: (props: ICommonModeViewModelProps) => ICommonDetailsViewModel;

    [key: string]: (props: ICommonModeViewModelProps) => ICommonModeViewModel;
}

const modeViewModels: Record<string, ICommonModeViewModels> = {
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

export default function BudgetWorksheetViewModel(): IBudgetWorksheetViewModel {

    const { logger } = useAppContext();
    const dataService: IBudgetWorksheetDataService = BudgetWorksheetDataService(logger);

    const [modeViewModelProps, setModeViewModelProps] = useState<null | ICommonModeViewModelProps>(null);

    const [, setModeItem] = useState<IBudgetItem|null>(null);

    const internalSetModeItem = (item: IBudgetItem|null): void => {
        setModeItem(item);
        setModeViewModelProps(prevProps => prevProps
            ? {
                ...prevProps,
                item: item
            }
            : prevProps);
    };

    const internalSetModeViewModelProps = (props: null | ICommonModeViewModelProps): void => {
        setModeViewModelProps(props);
    }

    const sectionViewModels = dataService.listBudgetSections()
        .map(section => BudgetWorksheetSectionViewModel(
            logger,
            section,
            dataService,
            internalSetModeItem,
            internalSetModeViewModelProps));

    const loadBudget = async () => {
        await dataService.loadBudget();
    };

    const saveBudget = async () => {
        await dataService.saveBudget();
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

    const onAddSubmitted = (item: ICommonItem) => {
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
        sectionViewModels,
        modeViewModel,
        total: dataService.getBudgetTotalAbsolute(),
        status: dataService.getBudgetStatus(),

        loadBudget,
        saveBudget,
        addSection
    }
}

