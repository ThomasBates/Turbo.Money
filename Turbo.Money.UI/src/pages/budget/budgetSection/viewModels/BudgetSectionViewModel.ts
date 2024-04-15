
import BudgetSectionDataProvider from "data/budgetSection/BudgetSectionDataProvider";

import IBudgetSection from 'models/budget/IBudgetSection';

import CommonViewModel from "pages/common/viewModels/CommonViewModel";
import ICommonViewModel from "pages/common/viewModels/ICommonViewModel";

import BudgetSectionDetailsViewModel from "./BudgetSectionDetailsViewModel";
import BudgetSectionEditViewModel from "./BudgetSectionEditViewModel";

export default function BudgetSectionViewModel(): ICommonViewModel {
    const initialBudgetSection: IBudgetSection = {
        id: 0,
        name: "",
        description: "",
        direction: "out"
    };

    return CommonViewModel({
        title: "Budget Sections",
        modeTitle: "Budget Section",
        entity: "BudgetSection",
        dataProvider: BudgetSectionDataProvider,
        initialItem: initialBudgetSection,
        detailsViewModel: BudgetSectionDetailsViewModel,
        editViewModel: BudgetSectionEditViewModel
    });
}
