
import IBudgetSection from "models/budget/IBudgetSection";

import IBasicEditViewModel from "pages/basic/common/viewModels/IBasicEditViewModel";

export default interface IBudgetSectionEditViewModel extends IBasicEditViewModel {
    section: IBudgetSection;

    isValidName: boolean;
    isValidDescription: boolean;
    isValidDirection: boolean;
}
