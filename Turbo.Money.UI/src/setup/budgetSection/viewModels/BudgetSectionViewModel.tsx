import React from "react";

import BudgetSectionDataProvider from "data/budgetSection/BudgetSectionDataProvider";

import CommonViewModel from "../../common/viewModels/CommonViewModel";

import BudgetSectionDetailsViewModel from "./BudgetSectionDetailsViewModel";
import BudgetSectionEditViewModel from "./BudgetSectionEditViewModel";

export default function BudgetSectionViewModel() {
    const initialBudgetSection = {
        id: null,
        name: "",
        description: "",
        direction: "out"
    };

    return CommonViewModel(
        "Budget Sections",
        BudgetSectionDataProvider,
        initialBudgetSection,
        BudgetSectionDetailsViewModel,
        BudgetSectionEditViewModel);
};
