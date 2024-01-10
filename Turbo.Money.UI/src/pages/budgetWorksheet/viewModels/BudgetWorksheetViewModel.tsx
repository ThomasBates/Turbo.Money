import React, { useState, useEffect } from "react";

import BudgetWorksheetDataService from "../data/BudgetWorksheetDataService";

import BudgetWorksheetSectionViewModel from "./BudgetWorksheetSectionViewModel";

export default () => {
    const dataService = BudgetWorksheetDataService();

    const tempSections = [{
        id: "in", name: "Income",
        categories: [{
            id: 1, name: "Automatic",
            accounts: [
                { id: 1, name: "Paycheque" },
                { id: 2, name: "Other Income" }]
        }]
    }, {
        id: "out", name: "Expenses",
        categories: [{
            id: 1, name: "Necessary",
            accounts: [
                { id: 3, name: "Tithing" },
                { id: 3, name: "Rent" },
                { id: 4, name: "Energy" },
                { id: 3, name: "Groceries" },
            ]
        }, {
            id: 1, name: "Important",
            accounts: [
                { id: 3, name: "Fast Offering" },
                { id: 3, name: "Dates" },
                { id: 4, name: "Allowance" }
            ]
        }, {
            id: 1, name: "Irregular",
            accounts: [
                { id: 3, name: "Car Maintenance" },
                { id: 4, name: "Home Maintenance" }
            ]
        }]
    }];

    const [sections, setSections] = useState([]);

    useEffect(() => {
        retrieveAllItems();
    }, []);

    //  Data Service Methods

    const retrieveAllItems = () => {
        dataService.getAll()
            .then(response => {
                console.log("retrieveAllItems: ", response.data);
                setSections(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    console.log(sections);

    const sectionViewModels = sections &&
        sections.map(section => BudgetWorksheetSectionViewModel(section));

    return {
        title: "Budget Worksheet",
        sectionViewModels
    }
};
