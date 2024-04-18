
import IModelItem from 'common/models/IModelItem';

import IBankAccount from 'models/bank/IBankAccount';

import IBasicModeViewModelProps from 'pages/basic/common/viewModels/IBasicModeViewModelProps';

import ILoggerService from 'services/logger/ILoggerService';

import IBankWorksheetDataService from "../data/IBankWorksheetDataService";

import IBankWorksheetAccountViewModel from './IBankWorksheetAccountViewModel';

export default function BankWorksheetAccountViewModel(
    _logger: ILoggerService,
    account: IBankAccount,
    dataService: IBankWorksheetDataService,
    setModeItem: (item: IModelItem | null) => void,
    setModeViewModelProps: (props: null | IBasicModeViewModelProps) => void): IBankWorksheetAccountViewModel {

    const showAccount = () => {
        const accountToShow: IBankAccount = {
            id: account.id,
            name: account.name,
            description: account.description,
            bankId: account.bankId,
            number: account.number,
        };
        setModeItem(accountToShow as IModelItem);
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
        setModeItem(accountToEdit as IModelItem);
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

    const onEditSubmitted = (item: IModelItem) => {
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
        setModeItem(accountToDelete as IModelItem);
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

    const onDeleteSubmitted = (item: IModelItem) => {
        dataService.deleteBankAccount(item as IBankAccount);
        setModeViewModelProps(null);
    };

    return {
        name: account.name,
        number: account.number,
        description: account.description,


        showAccount,
        editAccount,
        deleteAccount
    }
}
