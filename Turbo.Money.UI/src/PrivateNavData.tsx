import React from "react";

import BankDataService from './setup/bank/BankDataService';
import BudgetDataService from './setup/budget/BudgetDataService';

export default function PrivateNavData() {

    const initialNavData = {
        content: "root",
        minWidth: "48em", // "768px",
        list: [
            {
                content: (<img src="/assets/images/logo.png" alt="It's My Money" width="200" />),
                to: "/",
            },
            {
                content: "Home",
                to: "/",
            },
            {
                content: "Budget",
                width: 170,
                list: [
                    { content: "Budget Worksheet", to: "/BudgetWorksheetView" },
                    { content: "View Budget", to: "/BudgetView", enabled: false }
                ]
            },
            {
                content: "Transactions",
                width: 220,
                list: [
                    { content: "Record Transactions", to: "/TransactionEntry", enabled: false },
                    { content: "Import Bank Transactions From File", to: "/TransactionFileImport" },
                    { content: "Import Bank Transactions From Bank", to: "/TransactionBankImport", enabled: false }
                ]
            },
            {
                content: "Reports",
                width: 180,
                list: [
                    { content: "Report by Period", to: "/ReportByPeriod" },
                    { content: "Report by Account", to: "/ReportByAccount" }
                ]
            },
            {
                content: "Setup",
                width: 170,
                list: [
                    {
                        content: "Setup Bank Data",
                        width: 210,
                        list: [
                            { content: "Bank Setup", to: "/BankBankView" },
                            { content: "Bank Account Setup", to: "/BankAccountView" },
                            { content: "Create Sample Bank Data", func: BankDataService.createSampleData },
                        ]
                    },
                    {
                        content: "Setup Budget Data",
                        width: 230,
                        list: [
                            { content: "Budget Section Setup", to: "/BudgetSectionView" },
                            { content: "Budget Category Setup", to: "/BudgetCategoryView" },
                            { content: "Budget Account Setup", to: "/BudgetAccountView" },
                            { content: "Create Sample Budget Data", func: BudgetDataService.createSampleData },
                        ]
                    },
                    { content: "---" },
                    { content: "Foo" },
                    { content: "Bar" },
                ]
            },
            { content: "About", to: "/about" }
        ]
    };

    return initialNavData;
}
