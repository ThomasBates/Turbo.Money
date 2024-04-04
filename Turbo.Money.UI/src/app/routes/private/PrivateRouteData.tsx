import React from "react";
import { Outlet } from 'react-router-dom';

//  ----------------------------------------------------------------------------

import PrivateHeaderData from './PrivateHeaderData';
import PrivateNavData from './PrivateNavData';

import Header from 'components/header/Header';
import NavBar from 'components/navBar/NavBar';
import SideBar from 'components/SideBar';
import Footer from 'components/Footer';

import PostDataProvider from 'data/post/PostDataProvider';
import DashboardViewModel from 'pages/dashboard/viewModels/DashboardViewModel';
import DashboardView from 'pages/dashboard/views/DashboardView';

import BankWorksheetView from 'pages/bankWorksheet/views/BankWorksheetView';

import BudgetWorksheetViewModel from 'pages/budgetWorksheet/viewModels/BudgetWorksheetViewModel';
import BudgetWorksheetView from 'pages/budgetWorksheet/views/BudgetWorksheetView';

import BudgetView from 'pages/BudgetView';

import TransactionEntry from 'pages/TransactionEntry';

import BankTransactionUploadViewModel from 'pages/bankTransactions/viewModels/BankTransactionUploadViewModel';
import BankTransactionUploadView from 'pages/bankTransactions/views/BankTransactionUploadView';

import ReportByPeriod from 'pages/reports/views/ReportByPeriod';
import ReportByAccount from 'pages/reports/views/ReportByAccount';

import BankBankViewModel from 'setup/bankBank/viewModels/BankBankViewModel';
import BankBankView from 'setup/bankBank/views/BankBankView';

import BankAccountViewModel from 'setup/bankAccount/viewModels/BankAccountViewModel';
import BankAccountView from 'setup/bankAccount/views/BankAccountView';

import BudgetSectionViewModel from 'setup/budgetSection/viewModels/BudgetSectionViewModel';
import BudgetSectionView from 'setup/budgetSection/views/BudgetSectionView';

import BudgetCategoryViewModel from 'setup/budgetCategory/viewModels/BudgetCategoryViewModel';
import BudgetCategoryView from 'setup/budgetCategory/views/BudgetCategoryView';

import BudgetAccountViewModel from 'setup/budgetAccount/viewModels/BudgetAccountViewModel';
import BudgetAccountView from 'setup/budgetAccount/views/BudgetAccountView';

import About from 'pages/About';
import NotFound from 'pages/NotFound';

//  ----------------------------------------------------------------------------

export default function PrivateRouteData(app) {

    return [{
        element:
            <div>
                {/*<PrivateHeaderView viewModel={PrivateHeaderViewModel(HeaderDataProvider())} />*/}
                <Header headerData={PrivateHeaderData(app.users)} />
                <NavBar navData={PrivateNavData()} />
                <div className="tb-content">
                    <SideBar />
                    <div className="tb-main">
                        <Outlet />
                    </div>
                </div>
                <Footer />
            </div>,
        children: [
            //  dashboard
            //{ path: "/", element: <DashboardView viewModel={DashboardViewModel} viewModelArgs={{ postDataProvider: PostDataProvider(app.logger, app.errors) }} /> },

            //  Budget 
            { path: "/", element: < BudgetWorksheetView viewModel={BudgetWorksheetViewModel} /> },
            { path: "/BudgetWorksheetView", element: < BudgetWorksheetView viewModel={BudgetWorksheetViewModel} /> },
            { path: "/BudgetView", element: < BudgetView /> },

            //  Transactions
            { path: "/TransactionEntry", element: < TransactionEntry /> },
            { path: "/TransactionFileImport", element: < BankTransactionUploadView viewModel={BankTransactionUploadViewModel} /> },

            //  Reports
            { path: "/ReportByPeriod", element: < ReportByPeriod /> },
            { path: "/ReportByAccount", element: < ReportByAccount /> },

            //  Setup
            { path: "/BankWorksheet", element: < BankWorksheetView /> },
            { path: "/BankBankView", element: < BankBankView viewModel={BankBankViewModel} /> },
            { path: "/BankAccountView", element: < BankAccountView viewModel={BankAccountViewModel} /> },
            { path: "/BudgetSectionView", element: < BudgetSectionView viewModel={BudgetSectionViewModel} /> },
            { path: "/BudgetCategoryView", element: < BudgetCategoryView viewModel={BudgetCategoryViewModel} /> },
            { path: "/BudgetAccountView", element: < BudgetAccountView viewModel={BudgetAccountViewModel} /> },

            //  about
            { path: "/about", element: <About /> },
            { path: "*", element: <NotFound /> },
        ],
    }];
}
