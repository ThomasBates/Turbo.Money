
import IBudgetCategory from 'models/budget/IBudgetCategory';
import IBudgetSection from 'models/budget/IBudgetSection';
import ICommonItem from 'models/common/ICommonItem';


import ICommonModeViewModelProps from 'pages/common/viewModels/ICommonModeViewModelProps';

import ILoggerService from 'services/logger/ILoggerService';

import { IBudgetItem, IBudgetWorksheetDataService } from "../data/IBudgetWorksheetDataService";

import BudgetWorksheetCategoryViewModel from "./BudgetWorksheetCategoryViewModel";
import IBudgetWorksheetSectionViewModel from './IBudgetWorksheetSectionViewModel';
export default function BudgetWorksheetSectionViewModel(
    logger: ILoggerService,
    section: IBudgetSection,
    dataService: IBudgetWorksheetDataService,
    setModeItem: (item: IBudgetItem|null) => void,
    setModeViewModelProps: (props: null | ICommonModeViewModelProps) => void): IBudgetWorksheetSectionViewModel {

    const categoryViewModels = dataService.listBudgetCategories(section)
        .map(category => BudgetWorksheetCategoryViewModel(
            logger,
            category,
            dataService,
            setModeItem,
            setModeViewModelProps));

    const showSection = () => {
        const modeItem = {
            id: section.id,
            name: section.name,
            description: section.description,
            direction: section.direction,
        };
        setModeItem(modeItem);
        setModeViewModelProps({
            title: "Budget Section",
            entity: "BudgetSection",
            mode: "show",
            item: modeItem,
            onCancelled: onModeCancelled
        });
    }

    const onModeCancelled = () => {
        setModeViewModelProps(null);
    };

    const editSection = () => {
        const sectionToEdit = {
            id: section.id,
            name: section.name,
            description: section.description,
            direction: section.direction,
        };
        setModeItem(sectionToEdit);
        setModeViewModelProps({
            title: "Budget Section",
            entity: "BudgetSection",
            mode: "edit",
            item: sectionToEdit,
            setItem: setModeItem,
            list: dataService.listBudgetSectionNames(),
            onSubmitted: onEditSubmitted,
            onCancelled: onModeCancelled
        });
    }

    const onEditSubmitted = (item: ICommonItem) => {
        dataService.updateBudgetSection(item as IBudgetSection);
        setModeViewModelProps(null);
    };

    const deleteSection = () => {
        const sectionToDelete = {
            id: section.id,
            name: section.name,
            description: section.description,
            direction: section.direction,
        };
        setModeItem(sectionToDelete);
        setModeViewModelProps({
            title: "Budget Section",
            entity: "BudgetSection",
            mode: "delete",
            item: sectionToDelete,
            onSubmitted: onDeleteSubmitted,
            onCancelled: onModeCancelled
        });
    }

    const onDeleteSubmitted = (item: ICommonItem) => {
        dataService.deleteBudgetSection(item as IBudgetSection);
        setModeViewModelProps(null);
    };

    const addCategory = () => {
        const categoryToAdd = {
            id: -1,
            name: "",
            description: "",
            sectionId: section.id,
        };
        setModeItem(categoryToAdd);
        setModeViewModelProps({
            title: "Budget Category",
            entity: "BudgetCategory",
            mode: "add",
            item: categoryToAdd,
            setItem: setModeItem,
            list: dataService.listBudgetCategoryNames(),
            parentList: dataService.listBudgetSectionNames(),
            onSubmitted: onAddSubmitted,
            onCancelled: onModeCancelled
        });
    };

    const onAddSubmitted = (item: ICommonItem) => {
        dataService.createBudgetCategory(item as IBudgetCategory);
        setModeViewModelProps(null);
    };

    return {
        name: section.name,
        categoryViewModels,
        total: dataService.getBudgetSectionTotal(section),

        showSection,
        editSection,
        deleteSection,

        addCategory,
    }
}
