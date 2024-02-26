import React, { useState, useContext, useEffect } from "react";
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { RouterProvider, createBrowserRouter, useNavigate } from 'react-router-dom';

//  ----------------------------------------------------------------------------

import AppContext from "./AppContext";
import NavData from './NavData';

import CallbackGoogleSignUp from "./auth/CallbackGoogleSignUp";
import CallbackGoogleSignIn from "./auth/CallbackGoogleSignIn";
import SignUp from './auth/SignUp';
import SignIn from './auth/SignIn';

import Public from './pages/Public';

import Header from './components/Header';
import NavBar from './components/navBar/NavBar';
import SideBar from './components/SideBar';
import Footer from './components/Footer';

import Dashboard from './pages/Dashboard';

import BudgetWorksheetViewModel from './pages/budgetWorksheet/viewModels/BudgetWorksheetViewModel';
import BudgetWorksheetView from './pages/budgetWorksheet/views/BudgetWorksheetView';
import BudgetView from './pages/BudgetView';

import TransactionEntry from './pages/TransactionEntry';

import BankTransactionUploadViewModel from './pages/bankTransactions/viewModels/BankTransactionUploadViewModel';
import BankTransactionUploadView from './pages/bankTransactions/views/BankTransactionUploadView';

import ReportByPeriod from './pages/ReportByPeriod';
import ReportByAccount from './pages/ReportByAccount';

import BankViewModel from './setup/bank/viewModels/BankViewModel';
import BankView from './setup/bank/views/BankView';

import BankAccountViewModel from './setup/bankAccount/viewModels/BankAccountViewModel';
import BankAccountView from './setup/bankAccount/views/BankAccountView';

import BudgetSectionViewModel from './setup/budgetSection/viewModels/BudgetSectionViewModel';
import BudgetSectionView from './setup/budgetSection/views/BudgetSectionView';

import BudgetCategoryViewModel from './setup/budgetCategory/viewModels/BudgetCategoryViewModel';
import BudgetCategoryView from './setup/budgetCategory/views/BudgetCategoryView';

import BudgetAccountViewModel from './setup/budgetAccount/viewModels/BudgetAccountViewModel';
import BudgetAccountView from './setup/budgetAccount/views/BudgetAccountView';

import About from './pages/About';
import NotFound from './pages/NotFound';

//  ----------------------------------------------------------------------------

function NotFoundRedirect() {
    const location = useLocation();

    console.log("RouteData.NotFoundRedirect: location = ", location);

    return <Navigate to="/" replace state={{ from: location }} />;
}

function PrivateLayout() {
    return (
        <>
            <Header />
            <NavBar navData={NavData()} />
            <div className="tb-content">
                <SideBar />
                <div className="tb-main">
                    <Outlet />
                </div>
            </div>
            <Footer />
        </>
    );
}

function RouteData() {
    const { signedIn } = useContext(AppContext);

    console.log("RouteData.RouteData: signedIn = ", signedIn);

    const publicRouteData = [
        { path: "/", element: <Public /> },
    //  { path: '/auth/callback_google_signup', element: <CallbackGoogleSignUp /> }, // google will redirect here
        { path: '/auth/callback_google_signin', element: <CallbackGoogleSignIn /> }, // google will redirect here
        { path: "/signUp", element: <SignUp /> },
        { path: "/signIn", element: <SignIn /> },
        { path: "*", element: <NotFoundRedirect /> },
    ];

    const privateRouteData = [
        {
            element: <PrivateLayout />,
            children: [
                //  dashboard
                { path: "/", element: <Dashboard />, },
                { path: "/dashboard", element: <Dashboard />, },

                //  Budget 
                { path: "/BudgetWorksheetView", element: < BudgetWorksheetView viewModel={BudgetWorksheetViewModel} /> },
                { path: "/BudgetView", element: < BudgetView /> },

                //  Transactions
                { path: "/TransactionEntry", element: < TransactionEntry /> },
                { path: "/TransactionFileImport", element: < BankTransactionUploadView viewModel={BankTransactionUploadViewModel} /> },

                //  Reports
                { path: "/ReportByPeriod", element: < ReportByPeriod /> },
                { path: "/ReportByAccount", element: < ReportByAccount /> },

                //  Setup
                { path: "/BankView", element: < BankView viewModel={BankViewModel} /> },
                { path: "/BankAccountView", element: < BankAccountView viewModel={BankAccountViewModel} /> },
                { path: "/BudgetSectionView", element: < BudgetSectionView viewModel={BudgetSectionViewModel} /> },
                { path: "/BudgetCategoryView", element: < BudgetCategoryView viewModel={BudgetCategoryViewModel} /> },
                { path: "/BudgetAccountView", element: < BudgetAccountView viewModel={BudgetAccountViewModel} /> },

                //  about
                { path: "/about", element: <About /> },
                { path: "*", element: <NotFound /> },
            ],
        },
    ];

    const routeData = signedIn ? privateRouteData : publicRouteData;

    return (
        <RouterProvider router={createBrowserRouter(routeData)} />
    );
}

export default RouteData;
