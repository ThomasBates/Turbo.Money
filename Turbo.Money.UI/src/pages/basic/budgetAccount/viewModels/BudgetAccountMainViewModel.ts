import { useState, useEffect } from "react";

import { useAppContext } from 'app/AppContextAccess';

import IModelItem, { compareItems } from "common/models/IModelItem";

import BudgetCategoryDataProvider from "data/axios/basic/BudgetCategoryDataProvider";
import BudgetAccountDataProvider from "data/axios/basic/BudgetAccountDataProvider";

import BasicMainViewModel from "pages/basic/common/viewModels/BasicMainViewModel";
import IBasicModeViewModelProps from "pages/basic/common/viewModels/IBasicModeViewModelProps";
import IBasicMainViewModel from "pages/basic/common/viewModels/IBasicMainViewModel";

import BudgetAccountDetailsViewModel from "./BudgetAccountDetailsViewModel";
import BudgetAccountEditViewModel from "./BudgetAccountEditViewModel";

export default function BudgetAccountMainViewModel(): IBasicMainViewModel {
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

    const { logger } = useAppContext();

    const [categories, setCategories] = useState<IModelItem[]>([]);

    useEffect(() => {
        retrieveAllCategories();
    }, []);

    const retrieveAllCategories = async () => {
        const context = `${module}.${retrieveAllCategories.name}`;
        try {
            const response = await BudgetCategoryDataProvider.getList();
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
        dataProvider: BudgetAccountDataProvider,
        initialItem: initialBudgetAccount,
        detailsViewModel,
        editViewModel
    });
}
