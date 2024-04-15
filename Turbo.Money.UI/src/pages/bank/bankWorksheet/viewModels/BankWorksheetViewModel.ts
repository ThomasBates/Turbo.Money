
import { useState } from "react";

import { useAppContext } from 'app/AppContextAccess';

import IBankBank from 'models/bank/IBankBank';
import ICommonItem from "models/common/ICommonItem";

import BankBankDetailsViewModel from "pages/bank/bankBank/viewModels/BankBankDetailsViewModel";
import BankBankEditViewModel from "pages/bank/bankBank/viewModels/BankBankEditViewModel";
import BankAccountDetailsViewModel from "pages/bank/bankAccount/viewModels/BankAccountDetailsViewModel";
import BankAccountEditViewModel from "pages/bank/bankAccount/viewModels/BankAccountEditViewModel";

import ICommonModeViewModelProps from "pages/common/viewModels/ICommonModeViewModelProps";
import ICommonEditViewModel from "pages/common/viewModels/ICommonEditViewModel";
import ICommonModeViewModel from "pages/common/viewModels/ICommonModeViewModel";
import ICommonDetailsViewModel from "pages/common/viewModels/ICommonDetailsViewModel";

import { IBankItem, IBankWorksheetDataService } from "../data/IBankWorksheetDataService";
import BankWorksheetDataService from "../data/BankWorksheetDataService";

import BankWorksheetBankViewModel from "./BankWorksheetBankViewModel";
import IBankWorksheetViewModel from "./IBankWorksheetViewModel";

interface ICommonModeViewModels {
    add: (props: ICommonModeViewModelProps) => ICommonEditViewModel;
    edit: (props: ICommonModeViewModelProps) => ICommonEditViewModel;
    show: (props: ICommonModeViewModelProps) => ICommonDetailsViewModel;
    delete: (props: ICommonModeViewModelProps) => ICommonDetailsViewModel;

    [key: string]: (props: ICommonModeViewModelProps) => ICommonModeViewModel;
}

const modeViewModels: Record<string, ICommonModeViewModels> = {
    BankBank: {
        add: BankBankEditViewModel,
        edit: BankBankEditViewModel,
        show: BankBankDetailsViewModel,
        delete: BankBankDetailsViewModel,
    },
    BankAccount: {
        add: BankAccountEditViewModel,
        edit: BankAccountEditViewModel,
        show: BankAccountDetailsViewModel,
        delete: BankAccountDetailsViewModel,
    }
}

export default function BankWorksheetViewModel(): IBankWorksheetViewModel {

    const { logger } = useAppContext();
    const dataService: IBankWorksheetDataService = BankWorksheetDataService(logger);

    const [modeViewModelProps, setModeViewModelProps] = useState<null | ICommonModeViewModelProps>(null);

    const [, setModeItem] = useState<IBankItem|null>(null);

    const internalSetModeItem = (item: IBankItem|null): void => {
        setModeItem(item);
        setModeViewModelProps(prevProps => prevProps
            ? {
                ...prevProps,
                item: item
            }
            : prevProps);
    };

    const internalSetModeViewModelProps = (props: null | ICommonModeViewModelProps): void => {
        setModeViewModelProps(props);
    }

    const bankViewModels = dataService.listBankBanks()
        .map(bank => BankWorksheetBankViewModel(
            logger,
            bank,
            dataService,
            internalSetModeItem,
            internalSetModeViewModelProps));

    const loadBankData = async () => {
        await dataService.loadBankData();
    };

    const saveBankData = async () => {
        await dataService.saveBankData();
    };

    const addBank = () => {
        const bankToAdd = {
            id: -1,
            name: "",
            description: "",
            number: "",
            branch: "",
        };
        internalSetModeItem(bankToAdd);
        internalSetModeViewModelProps({
            title: "Bank Bank",
            entity: "BankBank",
            mode: "add",
            item: bankToAdd,
            setItem: internalSetModeItem,
            list: dataService.listBankBankNames(),
            onSubmitted: onAddSubmitted,
            onCancelled: onAddCancelled,
        });
    };

    const onAddSubmitted = (item: ICommonItem) => {
        dataService.createBankBank(item as IBankBank);
        internalSetModeViewModelProps(null);
    };

    const onAddCancelled = () => {
        internalSetModeViewModelProps(null);
    };

    const modeViewModel = modeViewModelProps &&
        modeViewModels[modeViewModelProps.entity][modeViewModelProps.mode](modeViewModelProps);

    return {
        title: "Bank Worksheet",
        bankViewModels,
        modeViewModel,

        loadBankData,
        saveBankData,
        addBank
    }
}

