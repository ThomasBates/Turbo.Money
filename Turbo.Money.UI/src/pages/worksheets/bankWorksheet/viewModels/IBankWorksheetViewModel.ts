
import IBasicModeViewModel from "pages/basic/common/viewModels/IBasicModeViewModel";

import IBankWorksheetBankViewModel from "./IBankWorksheetBankViewModel";

export default interface IBankWorksheetViewModel {
    title: string;
    bankViewModels: IBankWorksheetBankViewModel[];
    modeViewModel: null | IBasicModeViewModel;

    loadBankData: () => Promise<void>;
    saveBankData: () => Promise<void>;

    addBank: () => void;
}