
import IBasicDataProvider from "data/interfaces/basic/IBasicDataProvider";

import IBudgetSection from 'models/budget/IBudgetSection';

import BasicMainViewModel from "pages/basic/common/viewModels/BasicMainViewModel";
import IBasicMainViewModel from "pages/basic/common/viewModels/IBasicMainViewModel";

import ILoggerService from "services/logger/ILoggerService";
import IErrorService from "services/errors/IErrorService";

import BudgetSectionDetailsViewModel from "./BudgetSectionDetailsViewModel";
import BudgetSectionEditViewModel from "./BudgetSectionEditViewModel";

export default function BudgetSectionMainViewModel(
    logger: ILoggerService,
    errorService: IErrorService,
    budgetSectionDataProvider: IBasicDataProvider<IBudgetSection>
): IBasicMainViewModel {

    const initialBudgetSection: IBudgetSection = {
        id: 0,
        name: "",
        description: "",
        direction: "out"
    };

    return BasicMainViewModel(
        logger,
        errorService,
        budgetSectionDataProvider,

        "Budget Sections",
        "Budget Section",
        "BudgetSection",

        initialBudgetSection,
        BudgetSectionDetailsViewModel,
        BudgetSectionEditViewModel
    );
}
