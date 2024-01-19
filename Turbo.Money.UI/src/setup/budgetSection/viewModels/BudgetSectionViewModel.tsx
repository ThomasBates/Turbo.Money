import React from "react";

import CommonViewModel from "../../common/viewModels/CommonViewModel";

import BudgetSectionDataService from "../data/BudgetSectionDataService";

import BudgetSectionDetailsViewModel from "./BudgetSectionDetailsViewModel";
import BudgetSectionEditViewModel from "./BudgetSectionEditViewModel";

const BudgetSectionViewModel = () => {
    const initialBudgetSection = {
        id: null,
        name: "",
        description: "",
        direction: "out"
    };

    return CommonViewModel(
        "Budget Sections",
        BudgetSectionDataService,
        initialBudgetSection,
        BudgetSectionDetailsViewModel,
        BudgetSectionEditViewModel);
};

export default BudgetSectionViewModel;