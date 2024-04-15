import { useState, useEffect } from "react";

import { useAppContext } from 'app/AppContextAccess';

import BudgetSectionDataProvider from "data/budgetSection/BudgetSectionDataProvider";
import BudgetCategoryDataProvider from "data/budgetCategory/BudgetCategoryDataProvider";

import IBudgetCategory from "models/budget/IBudgetCategory";
import ICommonItem, { compareItems } from "models/common/ICommonItem";

import CommonViewModel from "pages/common/viewModels/CommonViewModel";
import ICommonModeViewModelProps from "pages/common/viewModels/ICommonModeViewModelProps";
import ICommonViewModel from "pages/common/viewModels/ICommonViewModel";

import BudgetCategoryDetailsViewModel from "./BudgetCategoryDetailsViewModel";
import BudgetCategoryEditViewModel from "./BudgetCategoryEditViewModel";

export default function BudgetCategoryViewModel(): ICommonViewModel {
    const module = BudgetCategoryViewModel.name;
    const category = 'BudgetCategory';

    const initialBudgetCategory: IBudgetCategory = {
        id: 0,
        name: "",
        description: "",
        sectionId: 0,
    };

    const { logger } = useAppContext();

    const [sections, setSections] = useState<ICommonItem[]>([]);

    useEffect(() => {
        retrieveAllSections();
    }, []);

    const retrieveAllSections = async () => {
        const context = `${module}.${retrieveAllSections.name}`;
        try {
            const response = await BudgetSectionDataProvider.getList()
            logger.debug(category, context, 'response.data =', response.data);

            const newSections = response.data
                .map((section: ICommonItem) => ({
                    id: section.id,
                    name: section.name
                }))
                .sort(compareItems);

            setSections(newSections);
        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
        }
    };

    const detailsViewModel = (props: ICommonModeViewModelProps) => {
        return BudgetCategoryDetailsViewModel({ ...props, parentList: sections });
    };

    const editViewModel = (props: ICommonModeViewModelProps) => {
        return BudgetCategoryEditViewModel({ ...props, parentList: sections });
    };

    return CommonViewModel({
        title: "Budget Categories",
        modeTitle: "Budget Category",
        entity: "BudgetCategory",
        dataProvider: BudgetCategoryDataProvider,
        initialItem: initialBudgetCategory,
        detailsViewModel,
        editViewModel
    });
}
