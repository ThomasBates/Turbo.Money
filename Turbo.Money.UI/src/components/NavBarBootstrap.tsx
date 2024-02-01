import React from "react";

const Link = require("react-router-dom").Link;

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBar() {
    return (
        <Navbar expand="lg" className="bg-dark" data-bs-theme="dark">
            {/*className="bg-dark tb-navbar"*/}
            <Container>
                <Navbar.Brand as={Link} to="/" >
                    <img src="/assets/images/logo.png" alt="TurboButterfly" width="199" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" role="">
                    <Nav className="me-auto">
                        <NavDropdown title="Budget">
                            <NavDropdown.Item as={Link} to="/BudgetWorksheetView">Budget Worksheet</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/BudgetView">View Budget</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Transactions">
                            <NavDropdown.Item as={Link} to="/TransactionEntry">Record Transactions</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/TransactionImport">Import Bank Transactions</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Reports">
                            <NavDropdown.Item as={Link} to="/ReportByPeriod">Report by Period</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/ReportByAccount">Report by Account</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Setup">
                            <NavDropdown.Item as={Link} to="/BankView">Bank Setup</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/BankAccountView">Bank Account Setup</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/BudgetSectionView">Budget Section Setup</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/BudgetCategoryView">Budget Category Setup</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/BudgetAccountView">Budget Account Setup</NavDropdown.Item>
                        </NavDropdown>
                        {/*
                        <NavDropdown title="Test" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/BatesList">Bates List</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/CitiesList">Cities List</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/ButtonTest">Button Test</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/FetchTest">Fetch Test</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/AxiosTest">Axios Test</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/AddTest">Add Test</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/TutorialsList">List Tutorials</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/AddTutorial">Add Tutorial</NavDropdown.Item>
                        </NavDropdown>
                        */}
                        <Nav.Link as={Link} to="/about">About</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
