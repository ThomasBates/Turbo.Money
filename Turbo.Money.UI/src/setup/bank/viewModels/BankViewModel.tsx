import React, { useState, useEffect } from "react";

import CommonViewModel from "../../common/viewModels/CommonViewModel";

import BankDataService from "../data/BankDataService";

import BankDetailsViewModel from "./BankDetailsViewModel";
import BankEditViewModel from "./BankEditViewModel";

export default () => {
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
