
import ICommonModeViewModel from "pages/common/viewModels/ICommonModeViewModel";

import IBankWorksheetBankViewModel from "./IBankWorksheetBankViewModel";

export default interface IBankWorksheetViewModel {
    title: string;
    bankViewModels: IBankWorksheetBankViewModel[];
    modeViewModel: null | ICommonModeViewModel;

    loadBankData: () => Promise<void>;
    saveBankData: () => Promise<void>;

    addBank: () => void;
}