import React, { useState } from "react";

function NavData() {

    const initialNavData = {
        content: "root",
        minWidth: "48em", // "768px",
        list: [
            {
                content: (<img src="/assets/images/logo.png" alt="TurboButterfly" width="200" />),
                to: "/",
            },
            {
                id: "budget",
                content: "Budget",
                width: 170,
                list: [
                    { content: "Budget Worksheet", to: "/BudgetWorksheetView" },
                    { content: "View Budget", to: "/BudgetView" }
                ]
            },
            {
                id: "transactions",
                content: "Transactions",
                width: 220,
                list: [
                    { content: "Record Transactions", to: "/TransactionEntry" },
                    { content: "Import Bank Transactions", to: "/TransactionImport", enabled: false }
                ]
            },
            {
                id: "reports",
                content: "Reports",
                width: 180,
                enabled: false,
                list: [
                    { content: "Report by Period", to: "/ReportByPeriod" },
                    { content: "Report by Account", to: "/ReportByAccount" }
                ]
            },
            {
                id: "setup",
                content: "Setup",
                width: 170,
                list: [
                    {
                        id: "setup-bank",
                        content: "Setup Bank Data",
                        width: 180,
                        list: [
                            { content: "Bank Setup", to: "/BankView" },
                            { content: "Bank Account Setup", to: "/BankAccountView" },
                        ]
                    },
                    {
                        id: "setup-budget",
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

    const [navData, setNavData] = useState(initialNavData);

    return navData;
}

export default NavData;
