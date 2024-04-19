import { useState, useEffect } from "react";

import IModelItem, { compareItems } from "common/models/IModelItem";

import IBasicDataProvider from "data/interfaces/basic/IBasicDataProvider";

import IBankAccount from "models/bank/IBankAccount";
import IBankBank from "models/bank/IBankBank";

import BasicMainViewModel from "pages/basic/common/viewModels/BasicMainViewModel";
import IBasicMainViewModel from "pages/basic/common/viewModels/IBasicMainViewModel";
import IBasicModeViewModelProps from "pages/basic/common/viewModels/IBasicModeViewModelProps";

import ILoggerService from "services/logger/ILoggerService";
import IErrorService from "services/errors/IErrorService";

import BankAccountDetailsViewModel from "./BankAccountDetailsViewModel";
import BankAccountEditViewModel from "./BankAccountEditViewModel";

export default function BankAccountMainViewModel(
    logger: ILoggerService,
    errorService: IErrorService,
    bankAccountDataProvider: IBasicDataProvider<IBankAccount>,
    bankBankDataProvider: IBasicDataProvider<IBankBank>
): IBasicMainViewModel {

    const module = BankAccountMainViewModel.name;
    const category = 'BankAccount';

    const initialAccount: IBankAccount = {
        id: 0,
        name: "",
        description: "",
        bankId: 0,
        number: ""
    };

    const [banks, setBanks] = useState<IModelItem[]>([]);

    useEffect(() => {
        retrieveAllBanks();
    }, []);

    const retrieveAllBanks = async () => {
        const context = `${module}.${retrieveAllBanks.name}`;
        try {
            const response = await bankBankDataProvider.getList();
            logger.debug(category, context, 'response.data =', response.data);

            const newBanks = response.data
                .map((bank:IModelItem) => ({
                    id: bank.id,
                    name: bank.name
                }))
                .sort(compareItems);

            setBanks(newBanks);
        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
        }
    };

    const detailsViewModel = (props: IBasicModeViewModelProps) => {
        return BankAccountDetailsViewModel({ ...props, parentList: banks });
    };

    const editViewModel = (props: IBasicModeViewModelProps) => {
        return BankAccountEditViewModel({ ...props, parentList: banks });
    };

    return BasicMainViewModel(
        logger,
        errorService,
        bankAccountDataProvider,

        "Bank Accounts",
        "Bank Account",
        "BankAccount",

        initialAccount,
        detailsViewModel,
        editViewModel
    );
}
