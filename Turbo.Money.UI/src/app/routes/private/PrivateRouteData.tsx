import { Outlet, RouteObject } from 'react-router-dom';

//  ----------------------------------------------------------------------------

import PrivateHeaderData from './PrivateHeaderData';
import PrivateNavData from './PrivateNavData';

import Header from 'components/header/Header';
import NavBar from 'components/navBar/NavBar';
import SideBar from 'components/SideBar';
import Footer from 'components/Footer';

import BankAccountDataProvider from "data/axios/basic/BankAccountDataProvider";
import BankBankDataProvider from "data/axios/basic/BankBankDataProvider";
import BankTransactionDataProvider from "data/axios/basic/BankTransactionDataProvider";
import BudgetSectionDataProvider from "data/axios/basic/BudgetSectionDataProvider";
import BudgetCategoryDataProvider from "data/axios/basic/BudgetCategoryDataProvider";
import BudgetAccountDataProvider from "data/axios/basic/BudgetAccountDataProvider";
import PostDataProvider from 'data/axios/services/PostDataProvider';

import BankTransactionDataService from "pages/services/bankTransactions/data/BankTransactionDataService";

import DashboardViewModel from 'pages/app/dashboard/viewModels/DashboardViewModel';
import DashboardView from 'pages/app/dashboard/views/DashboardView';

import BudgetScheduleDataProvider from 'data/axios/basic/BudgetScheduleDataProvider';
import BudgetScheduleViewModel from 'pages/services/budgetSchedule/viewModels/BudgetScheduleViewModel';
import BudgetScheduleView from 'pages/services/budgetSchedule/views/BudgetScheduleView';

import BudgetDataProvider from 'data/axios/services/BudgetDataProvider';
import BudgetWorksheetDataService from "pages/worksheets/budgetWorksheet/data/BudgetWorksheetDataService";
import BudgetWorksheetMainViewModel from 'pages/worksheets/budgetWorksheet/viewModels/BudgetWorksheetMainViewModel';
import BudgetWorksheetMainView from 'pages/worksheets/budgetWorksheet/views/BudgetWorksheetMainView';

import BudgetView from 'pages/worksheets/BudgetView';

import BankWorksheetDataService from "pages/worksheets/bankWorksheet/data/BankWorksheetDataService";
import BankWorksheetViewModel from 'pages/worksheets/bankWorksheet/viewModels/BankWorksheetViewModel';
import BankWorksheetView from 'pages/worksheets/bankWorksheet/views/BankWorksheetView';

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

import ILoggerService from 'services/logger/ILoggerService';
import IErrorService from 'services/errors/IErrorService';
import IUserService from 'services/user/IUserService';

//  ----------------------------------------------------------------------------

export default function PrivateRouteData(
    userService: IUserService,
    loggerService: ILoggerService,
    errorService: IErrorService
): RouteObject[] {

    return [{
        element:
            <div>
                <Header headerData={PrivateHeaderData(userService)} />
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
            {
                path: "/",
                element: < BudgetAccountMainView dataContext={() =>
                    BudgetAccountMainViewModel(
                        loggerService,
                        errorService,
                        BudgetAccountDataProvider,
                        BudgetCategoryDataProvider)} />
            },

            //  dashboard
            {
                path: "/dashboard",
                element: <DashboardView
                    dataContext={() =>
                        DashboardViewModel(
                            loggerService,
                            userService,
                            PostDataProvider(
                                loggerService,
                                errorService)
                        )
                    }
                />
            },

            //  Budget 
            {
                path: "/BudgetSchedule",
                element: < BudgetScheduleView dataContext={() =>
                    BudgetScheduleViewModel(
                        loggerService,
                        errorService,
                        BudgetScheduleDataProvider
                    )
                } />
            },
            {
                path: "/BudgetWorksheet",
                element: < BudgetWorksheetMainView dataContext={() =>
                    BudgetWorksheetMainViewModel(
                        loggerService,
                        BudgetWorksheetDataService(
                            loggerService,
                            BudgetDataProvider()
                        )
                    )
                } />
            },
            {
                path: "/BudgetView",
                element: < BudgetView />
            },

            //  Transactions
            {
                path: "/TransactionEntry",
                element: < TransactionEntry />
            },
            {
                path: "/TransactionFileImport",
                element: < BankTransactionUploadView dataContext={() =>
                    BankTransactionUploadViewModel(
                        BankTransactionDataService(
                            BankTransactionDataProvider(
                                loggerService
                            )
                        )
                    )
                } />
            },

            //  Reports
            {
                path: "/ReportByPeriod",
                element: < ReportByPeriod />
            },
            {
                path: "/ReportByAccount",
                element: < ReportByAccount />
            },

            //  Setup
            {
                path: "/BankWorksheet",
                element: <BankWorksheetView dataContext={() =>
                    BankWorksheetViewModel(
                        loggerService,
                        BankWorksheetDataService(
                            loggerService,
                            BankAccountDataProvider,
                            BankBankDataProvider
                        )
                    )
                } />
            },
            {
                path: "/BankBank",
                element: < BankBankMainView dataContext={() =>
                    BankBankViewModel(
                        loggerService,
                        errorService,
                        BankBankDataProvider
                    )
                } />
            },
            {
                path: "/BankAccount",
                element: < BankAccountMainView dataContext={() =>
                    BankAccountMainViewModel(
                        loggerService,
                        errorService,
                        BankAccountDataProvider,
                        BankBankDataProvider
                    )
                } />
            },

            {
                path: "/BudgetSection",
                element: < BudgetSectionMainView dataContext={() =>
                    BudgetSectionMainViewModel(
                        loggerService,
                        errorService,
                        BudgetSectionDataProvider
                    )
                } />
            },
            {
                path: "/BudgetCategory",
                element: < BudgetCategoryMainView dataContext={() =>
                    BudgetCategoryMainViewModel(
                        loggerService,
                        errorService,
                        BudgetCategoryDataProvider,
                        BudgetSectionDataProvider
                    )
                } />
            },
            {
                path: "/BudgetAccount",
                element: < BudgetAccountMainView dataContext={() =>
                    BudgetAccountMainViewModel(
                        loggerService,
                        errorService,
                        BudgetAccountDataProvider,
                        BudgetCategoryDataProvider
                    )
                } />
            },

            //  about
            {
                path: "/about",
                element: <About />
            },
            {
                path: "*",
                element: <NotFound />
            },
        ],
    }];
}
