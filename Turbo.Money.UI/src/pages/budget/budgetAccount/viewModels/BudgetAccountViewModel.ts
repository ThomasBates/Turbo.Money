import { useState, useEffect } from "react";

import { useAppContext } from 'app/AppContextAccess';

import BudgetCategoryDataProvider from "data/budgetCategory/BudgetCategoryDataProvider";
import BudgetAccountDataProvider from "data/budgetAccount/BudgetAccountDataProvider";

import ICommonItem, { compareItems } from "models/common/ICommonItem";

import CommonViewModel from "pages/common/viewModels/CommonViewModel";
import ICommonModeViewModelProps from "pages/common/viewModels/ICommonModeViewModelProps";
import ICommonViewModel from "pages/common/viewModels/ICommonViewModel";

import BudgetAccountDetailsViewModel from "./BudgetAccountDetailsViewModel";
import BudgetAccountEditViewModel from "./BudgetAccountEditViewModel";

export default function BudgetAccountViewModel(): ICommonViewModel {
    const module = BudgetAccountViewModel.name;
    const category = 'BudgetAccount';

    const initialBudgetAccount = {
        id: 0,
        name: "",
        description: "",
        categoryId: 0,
        amount: 0,
        type: "max",
        method: "",
    };

    const { logger } = useAppContext();

    const [categories, setCategories] = useState<ICommonItem[]>([]);

    useEffect(() => {
        retrieveAllCategories();
    }, []);

    const retrieveAllCategories = async () => {
        const context = `${module}.${retrieveAllCategories.name}`;
        try {
            const response = await BudgetCategoryDataProvider.getList();
            logger.debug(category, context, 'response.data =', response.data);

            const newCategories = response.data
                .map((category: ICommonItem) => ({
                    id: category.id,
                    name: category.name
                }))
                .sort(compareItems);

            setCategories(newCategories);
        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
        }
    };

    const detailsViewModel = (props: ICommonModeViewModelProps) => {
        return BudgetAccountDetailsViewModel({ ...props, parentList: categories });
    };

    const editViewModel = (props: ICommonModeViewModelProps) => {
        return BudgetAccountEditViewModel({ ...props, parentList: categories });
    };

    return CommonViewModel({
        title: "Budget Accounts",
        modeTitle: "Budget Account",
        entity: "BudgetAccount",
        dataProvider: BudgetAccountDataProvider,
        initialItem: initialBudgetAccount,
        detailsViewModel,
        editViewModel
    });
}
