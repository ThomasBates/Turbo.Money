import { useState, useEffect } from "react";

import { useAppContext } from 'app/AppContextAccess';

import IModelItem, { compareItems } from "common/models/IModelItem";

import BudgetSectionDataProvider from "data/axios/basic/BudgetSectionDataProvider";
import BudgetCategoryDataProvider from "data/axios/basic/BudgetCategoryDataProvider";

import IBudgetCategory from "models/budget/IBudgetCategory";

import BasicMainViewModel from "pages/basic/common/viewModels/BasicMainViewModel";
import IBasicModeViewModelProps from "pages/basic/common/viewModels/IBasicModeViewModelProps";
import IBasicMainViewModel from "pages/basic/common/viewModels/IBasicMainViewModel";

import BudgetCategoryDetailsViewModel from "./BudgetCategoryDetailsViewModel";
import BudgetCategoryEditViewModel from "./BudgetCategoryEditViewModel";

export default function BudgetCategoryMainViewModel(): IBasicMainViewModel {
    const module = BudgetCategoryMainViewModel.name;
    const category = 'BudgetCategory';

    const initialBudgetCategory: IBudgetCategory = {
        id: 0,
        name: "",
        description: "",
        sectionId: 0,
    };

    const { logger } = useAppContext();

    const [sections, setSections] = useState<IModelItem[]>([]);

    useEffect(() => {
        retrieveAllSections();
    }, []);

    const retrieveAllSections = async () => {
        const context = `${module}.${retrieveAllSections.name}`;
        try {
            const response = await BudgetSectionDataProvider.getList()
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
        dataProvider: BudgetCategoryDataProvider,
        initialItem: initialBudgetCategory,
        detailsViewModel,
        editViewModel
    });
}
