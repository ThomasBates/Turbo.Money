
import IBasicDataProvider from "data/interfaces/basic/IBasicDataProvider";

import IBudgetSection from 'models/budget/IBudgetSection';

import BasicMainViewModel from "pages/basic/common/viewModels/BasicMainViewModel";
import IBasicMainViewModel from "pages/basic/common/viewModels/IBasicMainViewModel";

import BudgetSectionDetailsViewModel from "./BudgetSectionDetailsViewModel";
import BudgetSectionEditViewModel from "./BudgetSectionEditViewModel";

export default function BudgetSectionMainViewModel(
    budgetSectionDataProvider: IBasicDataProvider<IBudgetSection>
): IBasicMainViewModel {

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
        dataProvider: budgetSectionDataProvider,
        initialItem: initialBudgetSection,
        detailsViewModel: BudgetSectionDetailsViewModel,
        editViewModel: BudgetSectionEditViewModel
    });
}
