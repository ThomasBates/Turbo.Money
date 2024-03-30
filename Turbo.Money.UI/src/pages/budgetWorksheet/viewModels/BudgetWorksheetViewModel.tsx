import React, { useState, useEffect } from "react";

import BudgetSectionDetailsViewModel from "../../../setup/budgetSection/viewModels/BudgetSectionDetailsViewModel";
import BudgetSectionEditViewModel from "../../../setup/budgetSection/viewModels/BudgetSectionEditViewModel";
import BudgetCategoryDetailsViewModel from "../../../setup/budgetCategory/viewModels/BudgetCategoryDetailsViewModel";
import BudgetCategoryEditViewModel from "../../../setup/budgetCategory/viewModels/BudgetCategoryEditViewModel";
import BudgetAccountDetailsViewModel from "../../../setup/budgetAccount/viewModels/BudgetAccountDetailsViewModel";
import BudgetAccountEditViewModel from "../../../setup/budgetAccount/viewModels/BudgetAccountEditViewModel";

import BudgetWorksheetDataService from "../data/BudgetWorksheetDataService";

import BudgetWorksheetSectionViewModel from "./BudgetWorksheetSectionViewModel";

const modeViewModels = {
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

export default function BudgetWorksheetViewModel() {
    const dataService = BudgetWorksheetDataService();

    const [modeViewModelProps, setModeViewModelProps] = useState(null);

    const [modeItem, setModeItem] = useState(null);

    const internalSetModeItem = (item) => {
        setModeItem(item);
        setModeViewModelProps(prevProps => prevProps
            ? {
                ...prevProps,
                item: item
            }
            : prevProps);
    };

    const internalSetModeViewModelProps = (props) => {
        setModeViewModelProps(props);
    }

    const sectionViewModels = dataService.listBudgetSections()
        .map(section => BudgetWorksheetSectionViewModel(
            section,
            dataService,
            internalSetModeItem,
            internalSetModeViewModelProps));

    const loadBudget = () => {
        dataService.loadBudget();
    };

    const saveBudget = () => {
        dataService.saveBudget();
    };

    const addSection = () => {
        let sectionToAdd = {
            id: -1,
            name: "",
            description: "",
            direction: "out"
        };
        internalSetModeItem(sectionToAdd);
        internalSetModeViewModelProps({
            entity: "BudgetSection",
            mode: "add",
            item: sectionToAdd,
            setItem: internalSetModeItem,
            list: dataService.listBudgetSectionNames(),
            onSubmitted: onAddSubmitted,
            onCancelled: onAddCancelled
        });
    };

    const onAddSubmitted = (sectionToAdd) => {
        dataService.createBudgetSection(sectionToAdd);
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
        total: dataService.getBudgetTotal(),

        loadBudget,
        saveBudget,
        addSection
    }
};

