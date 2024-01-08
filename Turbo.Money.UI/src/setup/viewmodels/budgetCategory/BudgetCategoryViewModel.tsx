import React from "react";

import BudgetCategoryDataService from "../../services/BudgetCategoryDataService";

import CommonViewModel from "../CommonViewModel";

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
