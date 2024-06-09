
import IModelItem from "common/models/IModelItem";

import IBudgetSection from 'models/budget/IBudgetSection';
import IBudgetPeriod from 'models/budget/IBudgetPeriod';

import IBasicModeViewModelProps from "pages/basic/common/viewModels/IBasicModeViewModelProps";

import ILoggerService from "services/logger/ILoggerService";

import IBudgetWorksheetDataService from "../data/IBudgetWorksheetDataService";

import BudgetWorksheetSectionViewModel from "./BudgetWorksheetSectionViewModel";
import IBudgetWorksheetBudgetViewModel from "./IBudgetWorksheetBudgetViewModel";

export default function BudgetWorksheetBudgetViewModel(
    logger: ILoggerService,
    dataService: IBudgetWorksheetDataService,
    selectedPeriod: null | IBudgetPeriod,
    setModeItem: (item: IModelItem | null) => void,
    setModeViewModelProps: (props: null | IBasicModeViewModelProps) => void,
): IBudgetWorksheetBudgetViewModel {

    const sectionViewModels = dataService.listBudgetSections()
        .map(section => BudgetWorksheetSectionViewModel(
            logger,
            section,
            dataService,
            setModeItem,
            setModeViewModelProps));

    const loadBudgetWorksheet = async () => {
        if (selectedPeriod && selectedPeriod.id > 0)
            await dataService.loadBudgetWorksheet(selectedPeriod.id);
    };

    const saveBudgetWorksheet = async () => {
        await dataService.saveBudgetWorksheet();
    };

    const addSection = () => {
        const sectionToAdd = {
            id: -1,
            name: "",
            description: "",
            direction: "out"
        };
        setModeItem(sectionToAdd);
        setModeViewModelProps({
            title: "Budget Section",
            entity: "BudgetSection",
            mode: "add",
            item: sectionToAdd,
            setItem: setModeItem,
            list: dataService.listBudgetSectionNames(),
            onSubmitted: onAddSubmitted,
            onCancelled: onAddCancelled,
        });
    };

    const onAddSubmitted = (item: IModelItem) => {
        dataService.createBudgetSection(item as IBudgetSection);
        setModeViewModelProps(null);
    };

    const onAddCancelled = () => {
        setModeViewModelProps(null);
    };

    return {
        title: "Budget Worksheet",
        sectionViewModels,
        total: dataService.getBudgetTotalAbsolute(),
        status: dataService.getBudgetStatus(),

        loadBudgetWorksheet,
        saveBudgetWorksheet,
        addSection
    }
}

