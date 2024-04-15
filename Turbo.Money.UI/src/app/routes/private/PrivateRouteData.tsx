import { Outlet } from 'react-router-dom';

import { AppContextType } from 'app/AppContextType';

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

import BankWorksheetView from 'pages/bank/bankWorksheet/views/BankWorksheetView';

import BudgetWorksheetViewModel from 'pages/budget/budgetWorksheet/viewModels/BudgetWorksheetViewModel';
import BudgetWorksheetView from 'pages/budget/budgetWorksheet/views/BudgetWorksheetView';

import BudgetView from 'pages/budget/BudgetView';

import TransactionEntry from 'pages/bank/TransactionEntry';

import BankTransactionUploadViewModel from 'pages/bank/bankTransactions/viewModels/BankTransactionUploadViewModel';
import BankTransactionUploadView from 'pages/bank/bankTransactions/views/BankTransactionUploadView';

import ReportByPeriod from 'pages/reports/views/ReportByPeriod';
import ReportByAccount from 'pages/reports/views/ReportByAccount';

import BankBankViewModel from 'pages/bank/bankBank/viewModels/BankBankViewModel';
import BankBankView from 'pages/bank/bankBank/views/BankBankView';

import BankAccountViewModel from 'pages/bank/bankAccount/viewModels/BankAccountViewModel';
import BankAccountView from 'pages/bank/bankAccount/views/BankAccountView';

import BudgetSectionViewModel from 'pages/budget/budgetSection/viewModels/BudgetSectionViewModel';
import BudgetSectionView from 'pages/budget/budgetSection/views/BudgetSectionView';

import BudgetCategoryViewModel from 'pages/budget/budgetCategory/viewModels/BudgetCategoryViewModel';
import BudgetCategoryView from 'pages/budget/budgetCategory/views/BudgetCategoryView';

import BudgetAccountViewModel from 'pages/budget/budgetAccount/viewModels/BudgetAccountViewModel';
import BudgetAccountView from 'pages/budget/budgetAccount/views/BudgetAccountView';

import About from 'pages/app/About';
import NotFound from 'pages/app/NotFound';

//  ----------------------------------------------------------------------------

export default function PrivateRouteData(app: AppContextType) {

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
            {
                path: "/dashboard", element: <DashboardView
                    dataContext={() => DashboardViewModel(PostDataProvider(app.logger, app.errors))}
                />
            },

            //  Budget 
            { path: "/", element: < BudgetWorksheetView dataContext={() => BudgetWorksheetViewModel()} /> },
            { path: "/BudgetWorksheetView", element: < BudgetWorksheetView dataContext={() => BudgetWorksheetViewModel()} /> },
            { path: "/BudgetView", element: < BudgetView /> },

            //  Transactions
            { path: "/TransactionEntry", element: < TransactionEntry /> },
            { path: "/TransactionFileImport", element: < BankTransactionUploadView dataContext={() => BankTransactionUploadViewModel()} /> },

            //  Reports
            { path: "/ReportByPeriod", element: < ReportByPeriod /> },
            { path: "/ReportByAccount", element: < ReportByAccount /> },

            //  Setup
            { path: "/BankWorksheet", element: < BankWorksheetView /> },
            { path: "/BankBankView", element: < BankBankView dataContext={() => BankBankViewModel()} /> },
            { path: "/BankAccountView", element: < BankAccountView dataContext={() => BankAccountViewModel()} /> },
            { path: "/BudgetSectionView", element: < BudgetSectionView dataContext={() => BudgetSectionViewModel()} /> },
            { path: "/BudgetCategoryView", element: < BudgetCategoryView dataContext={() => BudgetCategoryViewModel()} /> },
            { path: "/BudgetAccountView", element: < BudgetAccountView dataContext={() => BudgetAccountViewModel()} /> },

            //  about
            { path: "/about", element: <About /> },
            { path: "*", element: <NotFound /> },
        ],
    }];
}
