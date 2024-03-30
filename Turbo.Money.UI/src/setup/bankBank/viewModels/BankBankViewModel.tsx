import React, { useState, useEffect } from "react";

import CommonViewModel from "../../common/viewModels/CommonViewModel";

import BankDataService from "../data/BankBankDataService";

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
        BankDataService,
        initialBank,
        BankDetailsViewModel,
        BankEditViewModel);
};
