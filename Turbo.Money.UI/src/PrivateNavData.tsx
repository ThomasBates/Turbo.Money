import React, { useState } from "react";

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
                enabled: false,
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
                        width: 180,
                        list: [
                            { content: "Bank Setup", to: "/BankView" },
                            { content: "Bank Account Setup", to: "/BankAccountView" },
                        ]
                    },
                    {
                        content: "Setup Budget Data",
                        width: 200,
                        list: [
                            { content: "Budget Section Setup", to: "/BudgetSectionView" },
                            { content: "Budget Category Setup", to: "/BudgetCategoryView" },
                            { content: "Budget Account Setup", to: "/BudgetAccountView" }
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
