
import IModelItem from 'common/models/IModelItem';

import IBankAccount from 'models/bank/IBankAccount';
import IBankBank from 'models/bank/IBankBank';

import IBasicModeViewModelProps from 'pages/basic/common/viewModels/IBasicModeViewModelProps';

import ILoggerService from 'services/logger/ILoggerService';

import IBankWorksheetDataService from "../data/IBankWorksheetDataService";

import BankWorksheetAccountViewModel from "./BankWorksheetAccountViewModel";
import IBankWorksheetBankViewModel from './IBankWorksheetBankViewModel';
export default function BankWorksheetBankViewModel(
    logger: ILoggerService,
    bank: IBankBank,
    dataService: IBankWorksheetDataService,
    setModeItem: (item: IModelItem | null) => void,
    setModeViewModelProps: (props: null | IBasicModeViewModelProps) => void): IBankWorksheetBankViewModel {

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

    const onEditSubmitted = (item: IModelItem) => {
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

    const onDeleteSubmitted = (item: IModelItem) => {
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

    const onAddSubmitted = (item: IModelItem) => {
        dataService.createBankAccount(item as IBankAccount);
        setModeViewModelProps(null);
    };

    return {
        name: bank.name,
        number: bank.number,
        description: bank.description,
        accountViewModels,

        showBank,
        editBank,
        deleteBank,

        addAccount,
    }
}