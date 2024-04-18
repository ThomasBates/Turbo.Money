import { useState, useEffect } from "react";

import { useAppContext } from 'app/AppContextAccess';

import IModelItem, { compareItems } from "common/models/IModelItem";

import BankBankDataProvider from "data/axios/basic/BankBankDataProvider";
import BankAccountDataProvider from "data/axios/basic/BankAccountDataProvider";

import BankAccount from "models/bank/IBankAccount";

import BasicMainViewModel from "pages/basic/common/viewModels/BasicMainViewModel";
import IBasicModeViewModelProps from "pages/basic/common/viewModels/IBasicModeViewModelProps";
import IBasicMainViewModel from "pages/basic/common/viewModels/IBasicMainViewModel";

import BankAccountDetailsViewModel from "./BankAccountDetailsViewModel";
import BankAccountEditViewModel from "./BankAccountEditViewModel";

export default function BankAccountMainViewModel(): IBasicMainViewModel {
    const module = BankAccountMainViewModel.name;
    const category = 'BankAccount';

    const initialAccount: BankAccount = {
        id: 0,
        name: "",
        description: "",
        bankId: 0,
        number: ""
    };

    const { logger } = useAppContext();

    const [banks, setBanks] = useState<IModelItem[]>([]);

    useEffect(() => {
        retrieveAllBanks();
    }, []);

    const retrieveAllBanks = async () => {
        const context = `${module}.${retrieveAllBanks.name}`;
        try {
            const response = await BankBankDataProvider.getList();
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

    return BasicMainViewModel({
        title: "Bank Accounts",
        modeTitle: "Bank Account",
        entity: "BankAccount",
        dataProvider: BankAccountDataProvider,
        initialItem: initialAccount,
        detailsViewModel,
        editViewModel
    });
}
