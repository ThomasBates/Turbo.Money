
import IBankAccount from 'models/bank/IBankAccount';
import IBankBank from 'models/bank/IBankBank';
import ICommonItem from 'models/common/ICommonItem';


import ICommonModeViewModelProps from 'pages/common/viewModels/ICommonModeViewModelProps';

import ILoggerService from 'services/logger/ILoggerService';

import { IBankItem, IBankWorksheetDataService } from "../data/IBankWorksheetDataService";

import BankWorksheetAccountViewModel from "./BankWorksheetAccountViewModel";
import IBankWorksheetBankViewModel from './IBankWorksheetBankViewModel';
export default function BankWorksheetBankViewModel(
    logger: ILoggerService,
    bank: IBankBank,
    dataService: IBankWorksheetDataService,
    setModeItem: (item: IBankItem|null) => void,
    setModeViewModelProps: (props: null | ICommonModeViewModelProps) => void): IBankWorksheetBankViewModel {

    const accountViewModels = dataService.listBankAccounts(bank)
        .map(account => BankWorksheetAccountViewModel(
            logger,
            account,
            dataService,
            setModeItem,
            setModeViewModelProps));

    const showBank = () => {
        const modeItem = {
            id: bank.id,
            name: bank.name,
            description: bank.description,
            number: bank.number,
            branch: bank.branch,
        };
        setModeItem(modeItem);
        setModeViewModelProps({
            title: "Bank",
            entity: "BankBank",
            mode: "show",
            item: modeItem,
            onCancelled: onModeCancelled
        });
    }

    const onModeCancelled = () => {
        setModeViewModelProps(null);
    };

    const editBank = () => {
        const bankToEdit = {
            id: bank.id,
            name: bank.name,
            description: bank.description,
            number: bank.number,
            branch: bank.branch,
        };
        setModeItem(bankToEdit);
        setModeViewModelProps({
            title: "Bank",
            entity: "BankBank",
            mode: "edit",
            item: bankToEdit,
            setItem: setModeItem,
            list: dataService.listBankBankNames(),
            onSubmitted: onEditSubmitted,
            onCancelled: onModeCancelled
        });
    }

    const onEditSubmitted = (item: ICommonItem) => {
        dataService.updateBankBank(item as IBankBank);
        setModeViewModelProps(null);
    };

    const deleteBank = () => {
        const bankToDelete = {
            id: bank.id,
            name: bank.name,
            description: bank.description,
            number: bank.number,
            branch: bank.branch,
        };
        setModeItem(bankToDelete);
        setModeViewModelProps({
            title: "Bank",
            entity: "BankBank",
            mode: "delete",
            item: bankToDelete,
            onSubmitted: onDeleteSubmitted,
            onCancelled: onModeCancelled
        });
    }

    const onDeleteSubmitted = (item: ICommonItem) => {
        dataService.deleteBankBank(item as IBankBank);
        setModeViewModelProps(null);
    };

    const addAccount = () => {
        const accountToAdd = {
            id: -1,
            name: "",
            description: "",
            number: "",
            bankId: bank.id,
        };
        setModeItem(accountToAdd);
        setModeViewModelProps({
            title: "Bank Account",
            entity: "BankAccount",
            mode: "add",
            item: accountToAdd,
            setItem: setModeItem,
            list: dataService.listBankAccountNames(),
            parentList: dataService.listBankBankNames(),
            onSubmitted: onAddSubmitted,
            onCancelled: onModeCancelled
        });
    };

    const onAddSubmitted = (item: ICommonItem) => {
        dataService.createBankAccount(item as IBankAccount);
        setModeViewModelProps(null);
    };

    return {
        name: bank.name,
        number: bank.number,
        description: bank.name + ", " + bank.name + ", " + bank.name,
        accountViewModels,

        showBank,
        editBank,
        deleteBank,

        addAccount,
    }
}
