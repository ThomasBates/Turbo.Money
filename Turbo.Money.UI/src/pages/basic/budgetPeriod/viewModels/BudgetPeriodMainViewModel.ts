import { useEffect, useState } from "react";

import IDataProviderResponse from "common/data/IDataProviderResponse";

import IModelItem from "common/models/IModelItem";

import IBasicDataProvider from "data/interfaces/basic/IBasicDataProvider";

import IBudgetPeriod from "models/budget/IBudgetPeriod";

import BasicMainViewModel from "pages/basic/common/viewModels/BasicMainViewModel";

import ILoggerService from "services/logger/ILoggerService";
import IErrorService from "services/errors/IErrorService";

import BudgetPeriodDetailsViewModel from "./BudgetPeriodDetailsViewModel";
import BudgetPeriodEditViewModel from "./BudgetPeriodEditViewModel";
import IBudgetPeriodMainViewModel from "./IBudgetPeriodMainViewModel";

export default function BudgetPeriodMainViewModel(
    logger: ILoggerService,
    errorService: IErrorService,
    budgetPeriodDataProvider: IBasicDataProvider<IBudgetPeriod>
): IBudgetPeriodMainViewModel {

    const module = BudgetPeriodMainViewModel.name;
    const category = 'BudgetPeriod';

    const [isSandbox, setIsSandbox] = useState<boolean>(false);
    const [isClosed, setIsClosed] = useState<boolean>(false);

    useEffect(() => {
        common.loadData();
    }, [isSandbox, isClosed]);

    const getList = async (): Promise<IDataProviderResponse<IModelItem[]>> => {
        const context = `${module}.${getList.name}`;
        logger.verbose(category, context, '', {isSandbox, isClosed});

        const response = await budgetPeriodDataProvider.getAll();
        logger.debug(category, context, 'response.data =', response.data);

        const dataList = response.data
            .filter(item =>
                item.isSandbox == isSandbox &&
                item.isClosed == isClosed);

        return {
            data: dataList
        };
    }

    const modifiedProvider = {
        ...budgetPeriodDataProvider,
        getList,
    }

    const initialBudgetPeriod: IBudgetPeriod = {
        id: -1,
        name: "",
        description: "",
        start: "",
        end: "",
        isSandbox,
        isClosed,
    };

    const common = BasicMainViewModel(
        logger,
        errorService,
        modifiedProvider,

        isSandbox ? "Budget Period Sandbox" : isClosed ? "Closed Budget Periods" : "Open Budget Periods",
        "Budget Period",
        "BudgetPeriod",

        initialBudgetPeriod,
        BudgetPeriodDetailsViewModel,
        BudgetPeriodEditViewModel
    );

    const canLoadSandbox = true;
    const canLoadOpen = true;
    const canLoadClosed = true;

    const loadSandbox = () => {
        setIsSandbox(true);
        setIsClosed(false);
    }

    const loadOpen = () => {
        setIsSandbox(false);
        setIsClosed(false);
    }

    const loadClosed = () => {
        setIsSandbox(false);
        setIsClosed(true);
    }

    return {
        ...common,

        isSandbox,
        isClosed,

        canLoadSandbox,
        canLoadOpen,
        canLoadClosed,

        loadSandbox,
        loadOpen,
        loadClosed
    }
}
