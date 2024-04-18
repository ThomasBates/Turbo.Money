import { Outlet } from 'react-router-dom';

import { AppContextType } from 'app/AppContextType';

//  ----------------------------------------------------------------------------

import PrivateHeaderData from './PrivateHeaderData';
import PrivateNavData from './PrivateNavData';

import Header from 'components/header/Header';
import NavBar from 'components/navBar/NavBar';
import SideBar from 'components/SideBar';
import Footer from 'components/Footer';

import PostDataProvider from 'data/axios/services/PostDataProvider';
import DashboardViewModel from 'pages/app/dashboard/viewModels/DashboardViewModel';
import DashboardView from 'pages/app/dashboard/views/DashboardView';

import BankWorksheetViewModel from 'pages/worksheets/bankWorksheet/viewModels/BankWorksheetViewModel';
import BankWorksheetView from 'pages/worksheets/bankWorksheet/views/BankWorksheetView';

import BudgetWorksheetViewModel from 'pages/worksheets/budgetWorksheet/viewModels/BudgetWorksheetViewModel';
import BudgetWorksheetView from 'pages/worksheets/budgetWorksheet/views/BudgetWorksheetView';

import BudgetView from 'pages/worksheets/BudgetView';

import TransactionEntry from 'pages/services/TransactionEntry';

import BankTransactionUploadViewModel from 'pages/services/bankTransactions/viewModels/BankTransactionUploadViewModel';
import BankTransactionUploadView from 'pages/services/bankTransactions/views/BankTransactionUploadView';

import ReportByPeriod from 'pages/reports/views/ReportByPeriod';
import ReportByAccount from 'pages/reports/views/ReportByAccount';

import BankBankViewModel from 'pages/basic/bankBank/viewModels/BankBankMainViewModel';
import BankBankMainView from 'pages/basic/bankBank/views/BankBankMainView';

import BankAccountMainViewModel from 'pages/basic/bankAccount/viewModels/BankAccountMainViewModel';
import BankAccountMainView from 'pages/basic/bankAccount/views/BankAccountMainView';

import BudgetSectionMainViewModel from 'pages/basic/budgetSection/viewModels/BudgetSectionMainViewModel';
import BudgetSectionMainView from 'pages/basic/budgetSection/views/BudgetSectionMainView';

import BudgetCategoryMainViewModel from 'pages/basic/budgetCategory/viewModels/BudgetCategoryMainViewModel';
import BudgetCategoryMainView from 'pages/basic/budgetCategory/views/BudgetCategoryMainView';

import BudgetAccountMainViewModel from 'pages/basic/budgetAccount/viewModels/BudgetAccountMainViewModel';
import BudgetAccountMainView from 'pages/basic/budgetAccount/views/BudgetAccountMainView';

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
            //  home
            { path: "/", element: < BudgetAccountMainView dataContext={() => BudgetAccountMainViewModel()} /> },

            //  dashboard
            {
                path: "/dashboard", element: <DashboardView
                    dataContext={() => DashboardViewModel(PostDataProvider(app.logger, app.errors))}
                />
            },

            //  Budget 
            { path: "/BudgetWorksheetView", element: < BudgetWorksheetView dataContext={() => BudgetWorksheetViewModel()} /> },
            { path: "/BudgetView", element: < BudgetView /> },

            //  Transactions
            { path: "/TransactionEntry", element: < TransactionEntry /> },
            { path: "/TransactionFileImport", element: < BankTransactionUploadView dataContext={() => BankTransactionUploadViewModel()} /> },

            //  Reports
            { path: "/ReportByPeriod", element: < ReportByPeriod /> },
            { path: "/ReportByAccount", element: < ReportByAccount /> },

            //  Setup
            { path: "/BankWorksheet", element: <BankWorksheetView dataContext = { () => BankWorksheetViewModel() } /> },
            { path: "/BankBankView", element: < BankBankMainView dataContext={() => BankBankViewModel()} /> },
            { path: "/BankAccountView", element: < BankAccountMainView dataContext={() => BankAccountMainViewModel()} /> },

            { path: "/BudgetSectionView", element: < BudgetSectionMainView dataContext={() => BudgetSectionMainViewModel()} /> },
            { path: "/BudgetCategoryView", element: < BudgetCategoryMainView dataContext={() => BudgetCategoryMainViewModel()} /> },
            { path: "/BudgetAccountView", element: < BudgetAccountMainView dataContext={() => BudgetAccountMainViewModel()} /> },

            //  about
            { path: "/about", element: <About /> },
            { path: "*", element: <NotFound /> },
        ],
    }];
}
