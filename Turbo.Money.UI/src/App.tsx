import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from './components/Header';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

import Dashboard from './pages/Dashboard';
import BudgetWorksheetView from './pages/budgetEdit/views/BudgetWorksheetView';
import BudgetView from './pages/BudgetView';

import TransactionEntry from './pages/TransactionEntry';
import TransactionImport from './pages/TransactionImport';

import ReportByPeriod from './pages/ReportByPeriod';
import ReportByAccount from './pages/ReportByAccount';

import BankViewModel from './setup/viewModels/bank/BankViewModel';
import BankAccountViewModel from './setup/viewModels/bankAccount/BankAccountViewModel';
import BudgetCategoryViewModel from './setup/viewModels/budgetCategory/BudgetCategoryViewModel';
import BudgetAccountViewModel from './setup/viewModels/budgetAccount/BudgetAccountViewModel';

import BankView from './setup/views/bank/BankView';
import BankAccountView from './setup/views/bankAccount/BankAccountView';
import BudgetCategoryView from './setup/views/budgetCategory/BudgetCategoryView';
import BudgetAccountView from './setup/views/budgetAccount/BudgetAccountView';

//import BatesList from './test/BatesList';
//import CitiesList from './test/CitiesList';
//import ButtonTest from './test/ButtonTest';
//import FetchTest from './test/FetchTest';
//import AxiosTest from './test/AxiosTest';
//import AddTest from './test/AddTest';
//import TutorialsList from './test/TutorialsList';
//import AddTutorial from './test/AddTutorial';
//import Tutorial from './test/Tutorial';

function App() {
    return (
        <Router>
            <Header />
            <NavBar />
            <Routes>
                {/*<Route index element={<Dashboard />} />*/}
                <Route index element={<BudgetAccountView viewModel={BudgetAccountViewModel} />} />

                {/*Budget*/}
                <Route path="/BudgetWorksheetView" element={<BudgetWorksheetView />} />
                <Route path="/BudgetView" element={<BudgetView />} />

                {/*Transactions*/}
                <Route path="/TransactionEntry" element={<TransactionEntry />} />
                <Route path="/TransactionImport" element={<TransactionImport />} />

                {/*Reports*/}
                <Route path="/ReportByPeriod" element={<ReportByPeriod />} />
                <Route path="/ReportByAccount" element={<ReportByAccount />} />

                {/*Setup*/}
                <Route path="/BankView" element={<BankView viewModel={BankViewModel} />} />
                <Route path="/BankAccountView" element={<BankAccountView viewModel={BankAccountViewModel} />} />
                <Route path="/BudgetCategoryView" element={<BudgetCategoryView viewModel={BudgetCategoryViewModel} />} />
                <Route path="/BudgetAccountView" element={<BudgetAccountView viewModel={BudgetAccountViewModel} />} />

                {/*Test*/}
                {/*
                <Route path="/BatesList" element={<BatesList />} />
                <Route path="/CitiesList" element={<CitiesList/>} />
                <Route path="/ButtonTest" element={<ButtonTest/>} />
                <Route path="/FetchTest" element={<FetchTest />} />
                <Route path="/AxiosTest" element={<AxiosTest />} />
                <Route path="/AddTest" element={<AddTest />} />

                <Route path="/TutorialsList" element={<TutorialsList />} />
                <Route path="/AddTutorial" element={<AddTutorial />} />
                <Route path="/Tutorial/:id" element={<Tutorial />} />
                */}

                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound/>} />
            </Routes>
            <Footer />
        </Router>
    );
}

function About() {
    return <>About ...</>
}

function NotFound() {
    return <>You have landed on a page that doesn't exist</>;
}

export default App;