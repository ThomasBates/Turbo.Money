import { useState, useEffect } from "react";

import IModelItem, { compareItems } from "common/models/IModelItem";

import IBasicDataProvider from "data/interfaces/basic/IBasicDataProvider";

import IBudgetCategory from "models/budget/IBudgetCategory";
import IBudgetSection from "models/budget/IBudgetSection";

import BasicMainViewModel from "pages/basic/common/viewModels/BasicMainViewModel";
import IBasicModeViewModelProps from "pages/basic/common/viewModels/IBasicModeViewModelProps";
import IBasicMainViewModel from "pages/basic/common/viewModels/IBasicMainViewModel";

import ILoggerService from "services/logger/ILoggerService";

import BudgetCategoryDetailsViewModel from "./BudgetCategoryDetailsViewModel";
import BudgetCategoryEditViewModel from "./BudgetCategoryEditViewModel";

export default function BudgetCategoryMainViewModel(
    logger: ILoggerService,
    budgetCategoryDataProvider: IBasicDataProvider<IBudgetCategory>,
    budgetSectionDataProvider: IBasicDataProvider<IBudgetSection>
): IBasicMainViewModel {

    const module = BudgetCategoryMainViewModel.name;
    const category = 'BudgetCategory';

    const initialBudgetCategory: IBudgetCategory = {
        id: 0,
        name: "",
        description: "",
        sectionId: 0,
    };

    const [sections, setSections] = useState<IModelItem[]>([]);

    useEffect(() => {
        retrieveAllSections();
    }, []);

    const retrieveAllSections = async () => {
        const context = `${module}.${retrieveAllSections.name}`;
        try {
            const response = await budgetSectionDataProvider.getList()
            logger.debug(category, context, 'response.data =', response.data);

            const newSections = response.data
                .map((section: IModelItem) => ({
                    id: section.id,
                    name: section.name
                }))
                .sort(compareItems);

            setSections(newSections);
        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
        }
    };

    const detailsViewModel = (props: IBasicModeViewModelProps) => {
        return BudgetCategoryDetailsViewModel({ ...props, parentList: sections });
    };

    const editViewModel = (props: IBasicModeViewModelProps) => {
        return BudgetCategoryEditViewModel({ ...props, parentList: sections });
    };

    return BasicMainViewModel({
        title: "Budget Categories",
        modeTitle: "Budget Category",
        entity: "BudgetCategory",
        dataProvider: budgetCategoryDataProvider,
        initialItem: initialBudgetCategory,
        detailsViewModel,
        editViewModel
    });
}
