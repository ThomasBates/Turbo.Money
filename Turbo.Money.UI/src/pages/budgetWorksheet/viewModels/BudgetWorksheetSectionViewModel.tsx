
import BudgetWorksheetCategoryViewModel from "./BudgetWorksheetCategoryViewModel";

export default function BudgetWorksheetSectionViewModel(
    section,
    dataService,
    setModeItem,
    setModeViewModelProps) {

    const categoryViewModels = dataService.listBudgetCategories(section)
        .map(category => BudgetWorksheetCategoryViewModel(
            category,
            dataService,
            setModeItem,
            setModeViewModelProps));

    const showSection = () => {
        var modeItem = {
            id: section.id,
            name: section.name,
            description: section.description,
            direction: section.direction,
        };
        setModeItem(modeItem);
        setModeViewModelProps({
            entity: "BudgetSection",
            mode: "show",
            item: modeItem,
            onSubmitted: null,
            onCancelled: onModeCancelled
        });
    }

    const onModeCancelled = () => {
        setModeViewModelProps(null);
    };

    const editSection = () => {
        var sectionToEdit = {
            id: section.id,
            name: section.name,
            description: section.description,
            direction: section.direction,
        };
        setModeItem(sectionToEdit);
        setModeViewModelProps({
            entity: "BudgetSection",
            mode: "edit",
            item: sectionToEdit,
            setItem: setModeItem,
            list: dataService.listBudgetSectionNames(),
            onSubmitted: onEditSubmitted,
            onCancelled: onModeCancelled
        });
    }

    const onEditSubmitted = (editedSection) => {
        dataService.updateBudgetSection(editedSection);
        setModeViewModelProps(null);
    };

    const deleteSection = () => {
        var sectionToDelete = {
            id: section.id,
            name: section.name,
            description: section.description,
            direction: section.direction,
        };
        setModeItem(sectionToDelete);
        setModeViewModelProps({
            entity: "BudgetSection",
            mode: "delete",
            item: sectionToDelete,
            onSubmitted: onDeleteSubmitted,
            onCancelled: onModeCancelled
        });
    }

    const onDeleteSubmitted = (sectionToDelete) => {
        dataService.deleteBudgetSection(sectionToDelete);
        setModeViewModelProps(null);
    };

    const addCategory = () => {
        var categoryToAdd = {
            id: -1,
            name: "",
            description: "",
            sectionId: section.id,
        };
        setModeItem(categoryToAdd);
        setModeViewModelProps({
            entity: "BudgetCategory",
            mode: "add",
            item: categoryToAdd,
            setItem: setModeItem,
            list: dataService.listBudgetCategoryNames(),
            sections: dataService.listBudgetSectionNames(),
            onSubmitted: onAddSubmitted,
            onCancelled: onModeCancelled
        });
    };

    const onAddSubmitted = (categoryToAdd) => {
        dataService.createBudgetCategory(categoryToAdd);
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
};
