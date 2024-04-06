import { useState, useEffect } from "react";

import { useAppContext } from 'app/AppContextAccess';

import BankBankDataProvider from "data/bankBank/BankBankDataProvider";
import BankAccountDataProvider from "data/bankAccount/BankAccountDataProvider";

import CommonViewModel from "../../common/viewModels/CommonViewModel";

import BankAccountDetailsViewModel from "./BankAccountDetailsViewModel";
import BankAccountEditViewModel from "./BankAccountEditViewModel";

export default function BankAccountViewModel() {
    const module = BankAccountViewModel.name;
    const category = 'BankAccount';

    const initialAccount = {
        id: null,
        name: "",
        bankId: 0,
        number: ""
    };

    const { logger } = useAppContext();

    const [banks, setBanks] = useState([]);

    useEffect(() => {
        retrieveAllBanks();
    }, []);

    const compareItems = (item1, item2) => {
        const name1 = item1.name.toUpperCase();
        const name2 = item2.name.toUpperCase();
        if (name1 > name2) {
            return 1;
        }
        if (name1 < name2) {
            return -1;
        }
        return 0;
    }

    const retrieveAllBanks = async () => {
        const context = `${module}.${retrieveAllBanks.name}`;
        try {
            const response = await BankBankDataProvider.getList();
            logger.debug(category, context, 'response.data =', response.data);

            const newBanks = response.data
                .map(bank => ({
                    id: bank.id,
                    name: bank.name
                }))
                .sort(compareItems);

            setBanks(newBanks);
        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
        }
    };

    const detailsViewModel = (props) => {
        return BankAccountDetailsViewModel({ ...props, banks: banks });
    };

    const editViewModel = (props) => {
        return BankAccountEditViewModel({ ...props, banks: banks });
    };

    return CommonViewModel(
        "Bank Accounts",
        BankAccountDataProvider,
        initialAccount,
        detailsViewModel,
        editViewModel);
};
