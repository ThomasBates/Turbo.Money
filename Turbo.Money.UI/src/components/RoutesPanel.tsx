import React from "react";

import { Routes, Route } from "react-router-dom";

import Dashboard from '../pages/Dashboard';
import BudgetWorksheetViewModel from '../pages/budgetWorksheet/viewModels/BudgetWorksheetViewModel';
import BudgetWorksheetView from '../pages/budgetWorksheet/views/BudgetWorksheetView';
import BudgetView from '../pages/BudgetView';

import TransactionEntry from '../pages/TransactionEntry';
import TransactionImport from '../pages/TransactionImport';

import ReportByPeriod from '../pages/ReportByPeriod';
import ReportByAccount from '../pages/ReportByAccount';

import BankViewModel from '../setup/bank/viewModels/BankViewModel';
import BankView from '../setup/bank/views/BankView';

import BankAccountViewModel from '../setup/bankAccount/viewModels/BankAccountViewModel';
import BankAccountView from '../setup/bankAccount/views/BankAccountView';

import BudgetSectionViewModel from '../setup/budgetSection/viewModels/BudgetSectionViewModel';
import BudgetSectionView from '../setup/budgetSection/views/BudgetSectionView';

import BudgetCategoryViewModel from '../setup/budgetCategory/viewModels/BudgetCategoryViewModel';
import BudgetCategoryView from '../setup/budgetCategory/views/BudgetCategoryView';

import BudgetAccountViewModel from '../setup/budgetAccount/viewModels/BudgetAccountViewModel';
import BudgetAccountView from '../setup/budgetAccount/views/BudgetAccountView';

import About from '../pages/About';

function RoutesPanel({ navData }) {
    return (
        <div className="tb-main">
            <Routes>
                <Route index element={<Dashboard />} />
                {/*<Route index element={<BudgetWorksheetView viewModel={BudgetWorksheetViewModel()} />} />*/}

                {/* Budget */}
                <Route path="/BudgetWorksheetView" element={<BudgetWorksheetView viewModel={BudgetWorksheetViewModel()} />} />
                <Route path="/BudgetView" element={<BudgetView />} />

                {/* Transactions */}
                <Route path="/TransactionEntry" element={<TransactionEntry />} />
                <Route path="/TransactionImport" element={<TransactionImport />} />

                {/* Reports */}
                <Route path="/ReportByPeriod" element={<ReportByPeriod />} />
                <Route path="/ReportByAccount" element={<ReportByAccount />} />

                {/* Setup */}
                <Route path="/BankView" element={<BankView viewModel={BankViewModel} />} />
                <Route path="/BankAccountView" element={<BankAccountView viewModel={BankAccountViewModel} />} />
                <Route path="/BudgetSectionView" element={<BudgetSectionView viewModel={BudgetSectionViewModel} />} />
                <Route path="/BudgetCategoryView" element={<BudgetCategoryView viewModel={BudgetCategoryViewModel} />} />
                <Route path="/BudgetAccountView" element={<BudgetAccountView viewModel={BudgetAccountViewModel} />} />

                {/* About */}
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

function NotFound() {
    return <>You have landed on a page that doesn't exist</>;
}

export default RoutesPanel;