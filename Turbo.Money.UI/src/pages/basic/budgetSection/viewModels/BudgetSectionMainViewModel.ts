
import BudgetSectionDataProvider from "data/axios/basic/BudgetSectionDataProvider";

import IBudgetSection from 'models/budget/IBudgetSection';

import BasicMainViewModel from "pages/basic/common/viewModels/BasicMainViewModel";
import IBasicMainViewModel from "pages/basic/common/viewModels/IBasicMainViewModel";

import BudgetSectionDetailsViewModel from "./BudgetSectionDetailsViewModel";
import BudgetSectionEditViewModel from "./BudgetSectionEditViewModel";

export default function BudgetSectionMainViewModel(): IBasicMainViewModel {
    const initialBudgetSection: IBudgetSection = {
        id: 0,
        name: "",
        description: "",
        direction: "out"
    };

    return BasicMainViewModel({
        title: "Budget Sections",
        modeTitle: "Budget Section",
        entity: "BudgetSection",
        dataProvider: BudgetSectionDataProvider,
        initialItem: initialBudgetSection,
        detailsViewModel: BudgetSectionDetailsViewModel,
        editViewModel: BudgetSectionEditViewModel
    });
}
