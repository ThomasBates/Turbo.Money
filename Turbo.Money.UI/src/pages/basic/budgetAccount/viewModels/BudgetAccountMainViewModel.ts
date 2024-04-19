import { useState, useEffect } from "react";

import IModelItem, { compareItems } from "common/models/IModelItem";

import IBasicDataProvider from "data/interfaces/basic/IBasicDataProvider";

import IBudgetAccount from "models/budget/IBudgetAccount";
import IBudgetCategory from "models/budget/IBudgetCategory";

import BasicMainViewModel from "pages/basic/common/viewModels/BasicMainViewModel";
import IBasicModeViewModelProps from "pages/basic/common/viewModels/IBasicModeViewModelProps";
import IBasicMainViewModel from "pages/basic/common/viewModels/IBasicMainViewModel";

import ILoggerService from "services/logger/ILoggerService";

import BudgetAccountDetailsViewModel from "./BudgetAccountDetailsViewModel";
import BudgetAccountEditViewModel from "./BudgetAccountEditViewModel";

export default function BudgetAccountMainViewModel(
    logger: ILoggerService,
    budgetAccountDataProvider: IBasicDataProvider<IBudgetAccount>,
    budgetCategoryDataProvider: IBasicDataProvider<IBudgetCategory>
): IBasicMainViewModel {

    const module = BudgetAccountMainViewModel.name;
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

    const [categories, setCategories] = useState<IModelItem[]>([]);

    useEffect(() => {
        retrieveAllCategories();
    }, []);

    const retrieveAllCategories = async () => {
        const context = `${module}.${retrieveAllCategories.name}`;
        try {
            const response = await budgetCategoryDataProvider.getList();
            logger.debug(category, context, 'response.data =', response.data);

            const newCategories = response.data
                .map((category: IModelItem) => ({
                    id: category.id,
                    name: category.name
                }))
                .sort(compareItems);

            setCategories(newCategories);
        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
        }
    };

    const detailsViewModel = (props: IBasicModeViewModelProps) => {
        return BudgetAccountDetailsViewModel({ ...props, parentList: categories });
    };

    const editViewModel = (props: IBasicModeViewModelProps) => {
        return BudgetAccountEditViewModel({ ...props, parentList: categories });
    };

    return BasicMainViewModel({
        title: "Budget Accounts",
        modeTitle: "Budget Account",
        entity: "BudgetAccount",
        dataProvider: budgetAccountDataProvider,
        initialItem: initialBudgetAccount,
        detailsViewModel,
        editViewModel
    });
}
