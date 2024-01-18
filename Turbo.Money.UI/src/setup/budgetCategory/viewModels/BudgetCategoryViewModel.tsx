import React, { useState, useEffect } from "react";

import CommonViewModel from "../../common/viewModels/CommonViewModel";

import BudgetSectionDataService from "../../budgetSection/data/BudgetSectionDataService";
import BudgetCategoryDataService from "../data/BudgetCategoryDataService";

import BudgetCategoryDetailsViewModel from "./BudgetCategoryDetailsViewModel";
import BudgetCategoryEditViewModel from "./BudgetCategoryEditViewModel";

export default () => {
    const initialBudgetCategory = {
        id: null,
        name: "",
        description: "",
        direction: "out"
    };

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

    const retrieveAllSections = () => {
        BudgetSectionDataService.getAll()
            .then(response => {
                console.log("retrieveAllSections: ", response.data);
                const newSections = response.data.map(section => {
                    return {
                        id: section.id,
                        name: section.name
                    }
                }).sort(compareItems);
                setSections(newSections);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const detailsViewModel = (props) => {
        return BudgetCategoryDetailsViewModel({ ...props, sections: sections });
    };

    const editViewModel = (props) => {
        return BudgetCategoryEditViewModel({ ...props, sections: sections });
    };

    return CommonViewModel(
        "Budget Categories",
        BudgetCategoryDataService,
        initialBudgetCategory,
        detailsViewModel,
        editViewModel);
};
