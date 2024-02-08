import React, { useEffect, useState } from "react";

import NavBarTop from "./NavBarTopDot";
import NavBarSide from "./NavBarSideDot";

function NavBar() {
    const query = window.matchMedia("(hover:hover) and (pointer:fine)");

    //const [desktop, setDesktop] = useState(query.matches);
    const desktop = query.matches;

    //useEffect(() => {
    //    query.addEventListener("change", e => setDesktop(e.matches));
    //}, []);

    const MyNavBar = desktop ? NavBarTop : NavBarSide;

    return (
        <MyNavBar>
            <MyNavBar.Brand to="/" >
                <img src="/assets/images/logo.png" alt="TurboButterfly" width="200" />
            </MyNavBar.Brand>
            <MyNavBar.Dropdown text="Budget">
                <MyNavBar.Item text="Budget Worksheet" to="/BudgetWorksheetView" />
                <MyNavBar.Item text="View Budget" to="/BudgetView" />
            </MyNavBar.Dropdown>
            <MyNavBar.Dropdown text="Transactions">
                <MyNavBar.Item text="Record Transactions" to="/TransactionEntry" />
                <MyNavBar.Item text="Import Bank Transactions" to="/TransactionImport" />
            </MyNavBar.Dropdown>
            <MyNavBar.Dropdown text="Reports">
                <MyNavBar.Item text="Report by Period" to="/ReportByPeriod" />
                <MyNavBar.Item text="Report by Account" to="/ReportByAccount" />
            </MyNavBar.Dropdown>
            <MyNavBar.Dropdown text="Setup">
                <MyNavBar.Item text="Bank Setup" to="/BankView" />
                <MyNavBar.Item text="Bank Account Setup" to="/BankAccountView" />
                <MyNavBar.Item text="Budget Section Setup" to="/BudgetSectionView" />
                <MyNavBar.Item text="Budget Category Setup" to="/BudgetCategoryView" />
                <MyNavBar.Item text="Budget Account Setup" to="/BudgetAccountView" />
            </MyNavBar.Dropdown>
            <MyNavBar.Item text="About" to="/about" />
        </MyNavBar>
    );
}

export default NavBar;
