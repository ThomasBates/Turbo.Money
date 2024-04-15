import { useState, useEffect } from "react";

import { useAppContext } from 'app/AppContextAccess';

import BankBankDataProvider from "data/bankBank/BankBankDataProvider";
import BankAccountDataProvider from "data/bankAccount/BankAccountDataProvider";

import BankAccount from "models/bank/IBankAccount";
import ICommonItem, { compareItems } from "models/common/ICommonItem";

import CommonViewModel from "pages/common/viewModels/CommonViewModel";
import ICommonModeViewModelProps from "pages/common/viewModels/ICommonModeViewModelProps";
import ICommonViewModel from "pages/common/viewModels/ICommonViewModel";

import BankAccountDetailsViewModel from "./BankAccountDetailsViewModel";
import BankAccountEditViewModel from "./BankAccountEditViewModel";

export default function BankAccountViewModel(): ICommonViewModel {
    const module = BankAccountViewModel.name;
    const category = 'BankAccount';

    const initialAccount: BankAccount = {
        id: 0,
        name: "",
        description: "",
        bankId: 0,
        number: ""
    };

    const { logger } = useAppContext();

    const [banks, setBanks] = useState<ICommonItem[]>([]);

    useEffect(() => {
        retrieveAllBanks();
    }, []);

    const retrieveAllBanks = async () => {
        const context = `${module}.${retrieveAllBanks.name}`;
        try {
            const response = await BankBankDataProvider.getList();
            logger.debug(category, context, 'response.data =', response.data);

            const newBanks = response.data
                .map((bank:ICommonItem) => ({
                    id: bank.id,
                    name: bank.name
                }))
                .sort(compareItems);

            setBanks(newBanks);
        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
        }
    };

    const detailsViewModel = (props: ICommonModeViewModelProps) => {
        return BankAccountDetailsViewModel({ ...props, parentList: banks });
    };

    const editViewModel = (props: ICommonModeViewModelProps) => {
        return BankAccountEditViewModel({ ...props, parentList: banks });
    };

    return CommonViewModel({
        title: "Bank Accounts",
        modeTitle: "Bank Account",
        entity: "BankAccount",
        dataProvider: BankAccountDataProvider,
        initialItem: initialAccount,
        detailsViewModel,
        editViewModel
    });
}
