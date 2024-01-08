import React, { useState, useEffect } from "react";

import BankDataService from "../../services/BankDataService";

import CommonViewModel from "../CommonViewModel";

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
