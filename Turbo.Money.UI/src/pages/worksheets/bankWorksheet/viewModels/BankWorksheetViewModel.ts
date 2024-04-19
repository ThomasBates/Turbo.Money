import { useState } from "react";

import IModelItem from "common/models/IModelItem";

import IBankBank from 'models/bank/IBankBank';

import BankAccountDetailsViewModel from "pages/basic/bankAccount/viewModels/BankAccountDetailsViewModel";
import BankAccountEditViewModel from "pages/basic/bankAccount/viewModels/BankAccountEditViewModel";
import BankBankDetailsViewModel from "pages/basic/bankBank/viewModels/BankBankDetailsViewModel";
import BankBankEditViewModel from "pages/basic/bankBank/viewModels/BankBankEditViewModel";

import IBasicEditViewModel from "pages/basic/common/viewModels/IBasicEditViewModel";
import IBasicDetailsViewModel from "pages/basic/common/viewModels/IBasicDetailsViewModel";
import IBasicModeViewModel from "pages/basic/common/viewModels/IBasicModeViewModel";
import IBasicModeViewModelProps from "pages/basic/common/viewModels/IBasicModeViewModelProps";

import ILoggerService from "services/logger/ILoggerService";

import IBankWorksheetDataService from "../data/IBankWorksheetDataService";

import BankWorksheetBankViewModel from "./BankWorksheetBankViewModel";
import IBankWorksheetViewModel from "./IBankWorksheetViewModel";

interface IBasicModeViewModels {
    add: (props: IBasicModeViewModelProps) => IBasicEditViewModel;
    edit: (props: IBasicModeViewModelProps) => IBasicEditViewModel;
    show: (props: IBasicModeViewModelProps) => IBasicDetailsViewModel;
    delete: (props: IBasicModeViewModelProps) => IBasicDetailsViewModel;

    [key: string]: (props: IBasicModeViewModelProps) => IBasicModeViewModel;
}

const modeViewModels: Record<string, IBasicModeViewModels> = {
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

export default function BankWorksheetViewModel(
    logger: ILoggerService,
    dataService: IBankWorksheetDataService
): IBankWorksheetViewModel {

    const [modeViewModelProps, setModeViewModelProps] = useState<null | IBasicModeViewModelProps>(null);

    const [, setModeItem] = useState<IModelItem|null>(null);

    const internalSetModeItem = (item: IModelItem|null): void => {
        setModeItem(item);
        setModeViewModelProps(prevProps => prevProps
            ? {
                ...prevProps,
                item: item
            }
            : prevProps);
    };

    const internalSetModeViewModelProps = (props: null | IBasicModeViewModelProps): void => {
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

    const onAddSubmitted = (item: IModelItem) => {
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

