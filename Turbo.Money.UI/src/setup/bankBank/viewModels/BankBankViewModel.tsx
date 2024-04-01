import React, { useState, useEffect } from "react";

import BankBankDataProvider from "data/bankBank/BankBankDataProvider";

import CommonViewModel from "../../common/viewModels/CommonViewModel";

import BankDetailsViewModel from "./BankBankDetailsViewModel";
import BankEditViewModel from "./BankBankEditViewModel";

export default function BankViewModel() {
    const initialBank = {
        id: null,
        name: "",
        number: "",
        transit: ""
    };

    return CommonViewModel(
        "Banks",
        BankBankDataProvider,
        initialBank,
        BankDetailsViewModel,
        BankEditViewModel);
};
