import { useContext, useState, useEffect } from "react";

import AppContext from 'app/AppContext';

import BudgetSectionDataProvider from "data/budgetSection/BudgetSectionDataProvider";
import BudgetCategoryDataProvider from "data/budgetCategory/BudgetCategoryDataProvider";

import CommonViewModel from "../../common/viewModels/CommonViewModel";

import BudgetCategoryDetailsViewModel from "./BudgetCategoryDetailsViewModel";
import BudgetCategoryEditViewModel from "./BudgetCategoryEditViewModel";

export default function BudgetCategoryViewModel() {
    const module = BudgetCategoryViewModel.name;
    const category = 'BudgetCategory';

    const initialBudgetCategory = {
        id: null,
        name: "",
        description: "",
        direction: "out"
    };

    const { logger } = useContext(AppContext);

    const [sections, setSections] = useState([]);

    useEffect(() => {
        retrieveAllSections();
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

    const retrieveAllSections = async () => {
        const context = `${module}.${retrieveAllSections.name}`;
        try {
            const response = await BudgetSectionDataProvider.getList()
            logger.debug(category, context, 'response.data =', response.data);

            const newSections = response.data
                .map(section => ({
                    id: section.id,
                    name: section.name
                }))
                .sort(compareItems);

            setSections(newSections);
        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
        }
    };

    const detailsViewModel = (props) => {
        return BudgetCategoryDetailsViewModel({ ...props, sections: sections });
    };

    const editViewModel = (props) => {
        return BudgetCategoryEditViewModel({ ...props, sections: sections });
    };

    return CommonViewModel(
        "Budget Categories",
        BudgetCategoryDataProvider,
        initialBudgetCategory,
        detailsViewModel,
        editViewModel);
};
