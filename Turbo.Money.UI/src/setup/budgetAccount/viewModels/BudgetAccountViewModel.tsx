import React, { useState, useEffect } from "react";

import CommonViewModel from "../../common/viewModels/CommonViewModel";

import BudgetCategoryDataService from "../../budgetCategory/data/BudgetCategoryDataService";
import BudgetAccountDataService from "../data/BudgetAccountDataService";

import BudgetAccountDetailsViewModel from "./BudgetAccountDetailsViewModel";
import BudgetAccountEditViewModel from "./BudgetAccountEditViewModel";

export default () => {
    const initialAccount = {
        id: null,
        name: "",
        description: "",
        categoryId: 0,
        amount: 0,
        type: "max",
        method: "",
    };

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        retrieveAllCategories();
    }, []);

    const compareItems = (item1, item2) => {
        const name1 = item1.name.toUpperCase();
        const name2 = item2.name.toUpperCase();
        if (name1 > name2) {
            return 1;
        }
        if (name1 < name2) {
            return -1;
        }
        return 0;
    }

    const retrieveAllCategories = () => {
        BudgetCategoryDataService.getAll()
            .then(response => {
                console.log("retrieveAllCategories: ", response.data);
                const newCategories = response.data.map(category => {
                    return {
                        id: category.id,
                        name: category.name
                    }
                }).sort(compareItems);
                setCategories(newCategories);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const detailsViewModel = (props) => {
        return BudgetAccountDetailsViewModel({ ...props, categories: categories });
    };

    const editViewModel = (props) => {
        return BudgetAccountEditViewModel({ ...props, categories: categories });
    };

    return CommonViewModel(
        "Budget Accounts",
        BudgetAccountDataService,
        initialAccount,
        detailsViewModel,
        editViewModel);
};
