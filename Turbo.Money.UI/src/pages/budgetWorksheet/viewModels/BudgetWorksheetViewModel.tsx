import React, { useState, useEffect } from "react";

import BudgetSectionDetailsViewModel from "../../../setup/budgetSection/viewModels/BudgetSectionDetailsViewModel";
import BudgetSectionEditViewModel from "../../../setup/budgetSection/viewModels/BudgetSectionEditViewModel";
import BudgetCategoryDetailsViewModel from "../../../setup/budgetCategory/viewModels/BudgetCategoryDetailsViewModel";
import BudgetCategoryEditViewModel from "../../../setup/budgetCategory/viewModels/BudgetCategoryEditViewModel";
import BudgetAccountDetailsViewModel from "../../../setup/budgetAccount/viewModels/BudgetAccountDetailsViewModel";
import BudgetAccountEditViewModel from "../../../setup/budgetAccount/viewModels/BudgetAccountEditViewModel";

import BudgetWorksheetDataService from "../data/BudgetWorksheetDataService";

import BudgetWorksheetSectionViewModel from "./BudgetWorksheetSectionViewModel";

const modeViewModels = {
    BudgetSection: {
        add: BudgetSectionEditViewModel,
        edit: BudgetSectionEditViewModel,
        show: BudgetSectionDetailsViewModel,
        delete: BudgetSectionDetailsViewModel,
    },
    BudgetCategory: {
        add: BudgetCategoryEditViewModel,
        edit: BudgetCategoryEditViewModel,
        show: BudgetCategoryDetailsViewModel,
        delete: BudgetCategoryDetailsViewModel,
    },
    BudgetAccount: {
        add: BudgetAccountEditViewModel,
        edit: BudgetAccountEditViewModel,
        show: BudgetAccountDetailsViewModel,
        delete: BudgetAccountDetailsViewModel,
    }
}

const BudgetWorksheetViewModel = () => {
    const dataService = BudgetWorksheetDataService();

    const [modeViewModelProps, setModeViewModelProps] = useState(null);

    const [sections, setSections] = useState([]);

    const [sectionList, setSectionList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [accountList, setAccountList] = useState([]);

    const [modeItem, setModeItem] = useState(null);

    useEffect(() => {
        retrieveAllItems();
    }, []);

    const compareSections = (section1, section2) => {

        if (section1.direction > section2.direction) {
            return 1;
        }
        if (section1.direction < section2.direction) { 
            return -1;
        }

        const name1 = section1.name.toUpperCase();
        const name2 = section2.name.toUpperCase();
        if (name1 > name2) {
            return 1;
        }
        if (name1 < name2) {
            return -1;
        }
        return 0;
    }

    //  Data Service Methods

    const retrieveAllItems = () => {
        dataService.getAll()
            .then(response => {
                console.log("retrieveAllItems: ", response.data);
                setSections(response.data);
                extractValidationLists(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const writeAllItems = () => {
        dataService.writeAll(sections)
            .then(() => {
            })
            .catch(e => {
                console.log(e);
            });
    };

    const extractValidationLists = (sections) => {
        let newSectionList = [];
        let newCategoryList = [];
        let newAccountList = [];

        sections.map(section => {
            if (section.state === "deleted") {
                return;
            }
            newSectionList.push({
                id: section.id,
                name: section.name
            });
            section.categories.map(category => {
                if (category.state === "deleted") {
                    return;
                }
                newCategoryList.push({
                    id: category.id,
                    name: category.name
                });
                category.accounts.map(account => {
                    if (account.state === "deleted") {
                        return;
                    }
                    newAccountList.push({
                        id: account.id,
                        name: account.name
                    });
                });
            });
        });

        setSectionList(newSectionList);
        setCategoryList(newCategoryList);
        setAccountList(newAccountList);
    };

    const internalSetModeItem = (item) => {
        setModeItem(item);
        setModeViewModelProps(prevProps => prevProps ? { ...prevProps, item: item } : prevProps);
    }

    const internalSetModeViewModelProps = (props) => {
        setModeViewModelProps(props);
        if (!props) {   // a mode form was closed.
            extractValidationLists(sections);
        }
    }

    const sectionViewModels = sections &&
        sections
            .filter(section => section.state != "deleted")
            .map(section => BudgetWorksheetSectionViewModel(
                section,
                sectionList,
                categoryList,
                accountList,
                internalSetModeItem,
                internalSetModeViewModelProps));

    const addSection = () => {
        let sectionToAdd = {
            id: -1,
            name: "",
            description: "",
            direction: "out"
        };
        internalSetModeItem(sectionToAdd);
        internalSetModeViewModelProps({
            entity: "BudgetSection",
            mode: "add",
            item: sectionToAdd,
            setItem: internalSetModeItem,
            list: sectionList,
            onSubmitted: onAddSubmitted,
            onCancelled: onAddCancelled
        });
    };

    const onAddSubmitted = (sectionToAdd) => {
        const minID = sectionList.reduce(
            (min, section) => Number(min) < Number(section.id) ? Number(min) : Number(section.id), 0);
        sectionToAdd.id = minID - 1;
        sectionToAdd.categories = [];
        sectionToAdd.state = "created";

        let newList = [...sections, sectionToAdd].sort(compareSections);
        setSections(newList);

        internalSetModeViewModelProps(null);
    };

    const onAddCancelled = () => {
        internalSetModeViewModelProps(null);
    };

    const modeViewModel = modeViewModelProps &&
        modeViewModels[modeViewModelProps.entity][modeViewModelProps.mode](modeViewModelProps);

    return {
        title: "Budget Worksheet",
        sectionViewModels,
        modeViewModel,

        addSection
    }
};

export default BudgetWorksheetViewModel;
