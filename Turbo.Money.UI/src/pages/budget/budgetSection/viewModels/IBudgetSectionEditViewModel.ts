
import IBudgetSection from "models/budget/IBudgetSection";

import ICommonEditViewModel from "pages/common/viewModels/ICommonEditViewModel";

export default interface IBudgetSectionEditViewModel extends ICommonEditViewModel {
    section: IBudgetSection;

    isValidName: boolean;
    isValidDescription: boolean;
    isValidDirection: boolean;
}
