
import IBankAccount from 'models/bank/IBankAccount';
import ICommonItem from 'models/common/ICommonItem';

import ICommonModeViewModelProps from 'pages/common/viewModels/ICommonModeViewModelProps';

import ILoggerService from 'services/logger/ILoggerService';

import { IBankItem, IBankWorksheetDataService } from "../data/IBankWorksheetDataService";

import IBankWorksheetAccountViewModel from './IBankWorksheetAccountViewModel';

export default function BankWorksheetAccountViewModel(
    _logger: ILoggerService,
    account: IBankAccount,
    dataService: IBankWorksheetDataService,
    setModeItem: (item: IBankItem | null) => void,
    setModeViewModelProps: (props: null | ICommonModeViewModelProps) => void): IBankWorksheetAccountViewModel {

    const showAccount = () => {
        const accountToShow: IBankAccount = {
            id: account.id,
            name: account.name,
            description: account.description,
            bankId: account.bankId,
            number: account.number,
        };
        setModeItem(accountToShow as IBankItem);
        setModeViewModelProps({
            title: "Bank Account",
            entity: "BankAccount",
            mode: "show",
            item: accountToShow,
            parentList: dataService.listBankBankNames(),
            onCancelled: onModeCancelled
        });
    }

    const onModeCancelled = () => {
        setModeViewModelProps(null);
    };

    const editAccount = () => {
        const accountToEdit: IBankAccount = {
            id: account.id,
            name: account.name,
            description: account.description,
            bankId: account.bankId,
            number: account.number,
        };
        setModeItem(accountToEdit as IBankItem);
        setModeViewModelProps({
            title: "Bank Account",
            entity: "BankAccount",
            mode: "edit",
            item: accountToEdit,
            setItem: setModeItem,
            list: dataService.listBankAccountNames(),
            parentList: dataService.listBankBankNames(),
            onSubmitted: onEditSubmitted,
            onCancelled: onModeCancelled
        });
    }

    const onEditSubmitted = (item: ICommonItem) => {
        dataService.updateBankAccount(item as IBankAccount);
        setModeViewModelProps(null);
    };

    const deleteAccount = () => {
        const accountToDelete = {
            id: account.id,
            name: account.name,
            description: account.description,
            bankId: account.bankId,
            number: account.number,
        };
        setModeItem(accountToDelete as IBankItem);
        setModeViewModelProps({
            title: "Bank Account",
            entity: "BankAccount",
            mode: "delete",
            item: accountToDelete,
            parentList: dataService.listBankBankNames(),
            onSubmitted: onDeleteSubmitted,
            onCancelled: onModeCancelled
        });
    }

    const onDeleteSubmitted = (item: ICommonItem) => {
        dataService.deleteBankAccount(item as IBankAccount);
        setModeViewModelProps(null);
    };

    return {
        name: account.name,
        number: account.number,
        description: account.name + ", " + account.name + ", " + account.name,


        showAccount,
        editAccount,
        deleteAccount
    }
}
