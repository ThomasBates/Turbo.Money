
import ISelectOption from "common/views/ISelectOption";

import IBudgetPeriod from "models/budget/IBudgetPeriod";

import IBasicEditViewModel from "pages/basic/common/viewModels/IBasicEditViewModel";

export default interface IBudgetPeriodEditViewModel extends IBasicEditViewModel {
    period: IBudgetPeriod;

    templateSetList: ISelectOption[];
    templateList: ISelectOption[];

    isValidName: boolean;
    isValidDescription: boolean;
    isValidStart: boolean;
    isValidEnd: boolean;
    isValidTemplateId: boolean;
}
