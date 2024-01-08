import React, { useState, useEffect } from "react";

import BudgetCategoryDataService from "../../services/BudgetCategoryDataService";
import BudgetAccountDataService from "../../services/BudgetAccountDataService";

import CommonViewModel from "../CommonViewModel";

import BudgetAccountDetailsViewModel from "./BudgetAccountDetailsViewModel";
import BudgetAccountEditViewModel from "./BudgetAccountEditViewModel";

export default () => {
    const initialAccount = {
        id: null,
        name: "",
        description: "",
        categoryId: 0,
        amount: 0,
        method: "",
        type: "max"
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

    const detailsViewModel = (mode, account?, onSubmitted?, onCancelled?) => {
        return BudgetAccountDetailsViewModel(mode, account, categories, onSubmitted, onCancelled);
    };

    const editViewModel = (mode, account, setAccount, accounts, onSubmitted, onCancelled) => {
        return BudgetAccountEditViewModel(mode, account, setAccount, accounts, categories, onSubmitted, onCancelled);
    };

    return CommonViewModel(
        "Budget Accounts",
        BudgetAccountDataService,
        initialAccount,
        detailsViewModel,
        editViewModel);
};
