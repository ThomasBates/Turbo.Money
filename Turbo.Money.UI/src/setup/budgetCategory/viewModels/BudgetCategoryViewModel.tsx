import React from "react";

import CommonViewModel from "../../common/viewModels/CommonViewModel";

import BudgetCategoryDataService from "../data/BudgetCategoryDataService";

import BudgetCategoryDetailsViewModel from "./BudgetCategoryDetailsViewModel";
import BudgetCategoryEditViewModel from "./BudgetCategoryEditViewModel";

export default () => {
    const initialBudgetCategory = {
        id: null,
        name: "",
        description: "",
        direction: "out"
    };

    return CommonViewModel(
        "Budget Categories",
        BudgetCategoryDataService,
        initialBudgetCategory,
        BudgetCategoryDetailsViewModel,
        BudgetCategoryEditViewModel);
};
