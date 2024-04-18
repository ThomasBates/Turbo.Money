
import IModelItem from 'common/models/IModelItem';

import IBudgetAccount from 'models/budget/IBudgetAccount';
import IBudgetCategory from 'models/budget/IBudgetCategory';

import IBasicModeViewModelProps from 'pages/basic/common/viewModels/IBasicModeViewModelProps';

import ILoggerService from 'services/logger/ILoggerService';

import IBudgetWorksheetDataService from "../data/IBudgetWorksheetDataService";

import BudgetWorksheetAccountViewModel from "./BudgetWorksheetAccountViewModel";
import IBudgetWorksheetCategoryViewModel from './IBudgetWorksheetCategoryViewModel';

export default function BudgetWorksheetCategoryViewModel(
    logger: ILoggerService,
    category: IBudgetCategory,
    dataService: IBudgetWorksheetDataService,
    setModeItem: (item: IModelItem|null) => void,
    setModeViewModelProps: (props: null | IBasicModeViewModelProps) => void): IBudgetWorksheetCategoryViewModel {

    const module = BudgetWorksheetCategoryViewModel.name;
    const loggerCategory = 'BudgetWorksheet';

    const accountViewModels = dataService.listBudgetAccounts(category)
            .map(account => BudgetWorksheetAccountViewModel(
                logger,
                account,
                dataService,
                setModeItem,
                setModeViewModelProps));

    const showCategory = () => {
        const categoryToShow = {
            id: category.id,
            name: category.name,
            description: category.description,
            sectionId: category.sectionId,
        };
        setModeItem(categoryToShow as IModelItem);
        setModeViewModelProps({
            title: "Budget Category",
            entity: "BudgetCategory",
            mode: "show",
            item: categoryToShow,
            parentList: dataService.listBudgetSectionNames(),
            onCancelled: onModeCancelled
        });
    }

    const onModeCancelled = () => {
        setModeViewModelProps(null);
    };

    const editCategory = () => {
        const categoryToEdit = {
            id: category.id,
            name: category.name,
            description: category.description,
            sectionId: category.sectionId,
        };
        setModeItem(categoryToEdit as IModelItem);
        setModeViewModelProps({
            title: "Budget Category",
            entity: "BudgetCategory",
            mode: "edit",
            item: categoryToEdit,
            setItem: setModeItem,
            list: dataService.listBudgetCategoryNames(),
            parentList: dataService.listBudgetSectionNames(),
            onSubmitted: onEditSubmitted,
            onCancelled: onModeCancelled
        });
    }

    const onEditSubmitted = (item: IModelItem) => {
        dataService.updateBudgetCategory(item as IBudgetCategory);
        setModeViewModelProps(null);
    };

    const deleteCategory = () => {
        const categoryToDelete = {
            id: category.id,
            name: category.name,
            description: category.description,
            sectionId: category.sectionId,
        };
        setModeItem(categoryToDelete as IModelItem);
        setModeViewModelProps({
            title: "Budget Category",
            entity: "BudgetCategory",
            mode: "delete",
            item: categoryToDelete,
            parentList: dataService.listBudgetSectionNames(),
            onSubmitted: onDeleteSubmitted,
            onCancelled: onModeCancelled
        });
    }

    const onDeleteSubmitted = (item: IModelItem) => {
        dataService.deleteBudgetCategory(item as IBudgetCategory);
        setModeViewModelProps(null);
    };

    const addAccount = () => {
        const context = `${module}.${addAccount.name}`

        const accountToAdd = {
            id: -1,
            name: "",
            description: "",
            categoryId: category.id,
            amount: "0",
            type: "max",
            method: "",
        };
        setModeItem(accountToAdd as IModelItem);

        const accounts = dataService.listBudgetAccountNames();
        const categories = dataService.listBudgetCategoryNames();

        logger.debug(loggerCategory, context, 'accounts =', accounts)
        logger.debug(loggerCategory, context, 'categories =', categories)

        setModeViewModelProps({
            title: "Budget Account",
            entity: "BudgetAccount",
            mode: "add",
            item: accountToAdd,
            setItem: setModeItem,
            list: accounts,
            parentList: categories,
            onSubmitted: onAddSubmitted,
            onCancelled: onModeCancelled
        });
    };

    const onAddSubmitted = (item: IModelItem) => {
        dataService.createBudgetAccount(item as IBudgetAccount);
        setModeViewModelProps(null);
    };

    return {
        name: category.name,
        accountViewModels,
        total: dataService.getBudgetCategoryTotal(category),

        showCategory,
        editCategory,
        deleteCategory,

        addAccount,
    }
}
