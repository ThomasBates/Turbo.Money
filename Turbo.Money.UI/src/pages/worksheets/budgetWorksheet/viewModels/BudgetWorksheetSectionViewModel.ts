
import IModelItem from 'common/models/IModelItem';

import IBudgetCategory from 'models/budget/IBudgetCategory';
import IBudgetSection from 'models/budget/IBudgetSection';

import IBasicModeViewModelProps from 'pages/basic/common/viewModels/IBasicModeViewModelProps';

import ILoggerService from 'services/logger/ILoggerService';

import IBudgetWorksheetDataService from "../data/IBudgetWorksheetDataService";

import BudgetWorksheetCategoryViewModel from "./BudgetWorksheetCategoryViewModel";
import IBudgetWorksheetSectionViewModel from './IBudgetWorksheetSectionViewModel';
export default function BudgetWorksheetSectionViewModel(
    logger: ILoggerService,
    section: IBudgetSection,
    dataService: IBudgetWorksheetDataService,
    setModeItem: (item: IModelItem|null) => void,
    setModeViewModelProps: (props: null | IBasicModeViewModelProps) => void): IBudgetWorksheetSectionViewModel {

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

    const onEditSubmitted = (item: IModelItem) => {
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

    const onDeleteSubmitted = (item: IModelItem) => {
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

    const onAddSubmitted = (item: IModelItem) => {
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
