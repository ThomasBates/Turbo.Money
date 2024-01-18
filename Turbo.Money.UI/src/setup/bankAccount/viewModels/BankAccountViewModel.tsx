import React, { useState, useEffect } from "react";

import CommonViewModel from "../../common/viewModels/CommonViewModel";

import BankDataService from "../../bank/data/BankDataService";
import BankAccountDataService from "../data/BankAccountDataService";

import BankAccountDetailsViewModel from "./BankAccountDetailsViewModel";
import BankAccountEditViewModel from "./BankAccountEditViewModel";

export default () => {
    const initialAccount = {
        id: null,
        name: "",
        bankId: 0,
        number: ""
    };

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

    const retrieveAllBanks = () => {
        BankDataService.getAll()
            .then(response => {
                console.log("retrieveAllBanks: ", response.data);
                const newBanks = response.data.map(bank => {
                    return {
                        id: bank.id,
                        name: bank.name
                    }
                }).sort(compareItems);
                setBanks(newBanks);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const detailsViewModel = (props) => {
        return BankAccountDetailsViewModel({ ...props, banks: banks });
    };

    const editViewModel = (props) => {
        return BankAccountEditViewModel({ ...props, banks: banks });
    };

    return CommonViewModel(
        "Bank Accounts",
        BankAccountDataService,
        initialAccount,
        detailsViewModel,
        editViewModel);
};
