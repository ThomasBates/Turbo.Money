import { useState, useEffect } from "react";

import { useAppContext } from 'app/AppContextAccess';

import BudgetCategoryDataProvider from "data/budgetCategory/BudgetCategoryDataProvider";
import BudgetAccountDataProvider from "data/budgetAccount/BudgetAccountDataProvider";

import CommonViewModel from "../../common/viewModels/CommonViewModel";

import BudgetAccountDetailsViewModel from "./BudgetAccountDetailsViewModel";
import BudgetAccountEditViewModel from "./BudgetAccountEditViewModel";

export default function BudgetAccountViewModel() {
    const module = BudgetAccountViewModel.name;
    const category = 'BudgetAccount';

    const initialAccount = {
        id: null,
        name: "",
        description: "",
        categoryId: 0,
        amount: 0,
        type: "max",
        method: "",
    };

    const { logger } = useAppContext();

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

    const retrieveAllCategories = async () => {
        const context = `${module}.${retrieveAllCategories.name}`;
        try {
            const response = await BudgetCategoryDataProvider.getList();
            logger.debug(category, context, 'response.data =', response.data);

            const newCategories = response.data
                .map(category => ({
                    id: category.id,
                    name: category.name
                }))
                .sort(compareItems);

            setCategories(newCategories);
        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
        }
    };

    const detailsViewModel = (props) => {
        return BudgetAccountDetailsViewModel({ ...props, categories: categories });
    };

    const editViewModel = (props) => {
        return BudgetAccountEditViewModel({ ...props, categories: categories });
    };

    return CommonViewModel(
        "Budget Accounts",
        BudgetAccountDataProvider,
        initialAccount,
        detailsViewModel,
        editViewModel);
};
