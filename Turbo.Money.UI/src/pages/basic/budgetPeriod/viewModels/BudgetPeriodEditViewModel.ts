
import IModelItem from "common/models/IModelItem";

import IBudgetPeriod from "models/budget/IBudgetPeriod";

import BasicEditViewModel from "pages/basic/common/viewModels/BasicEditViewModel";
import IBasicModeViewModelProps from "pages/basic/common/viewModels/IBasicModeViewModelProps";

import { formatDate } from "services/tools/tools";

import IBudgetPeriodEditViewModel from "./IBudgetPeriodEditViewModel";

export default function BudgetPeriodEditViewModel(
    { title, entity, mode, item, list, setItem, onSubmitted, onCancelled }: IBasicModeViewModelProps
): IBudgetPeriodEditViewModel{

    const period = item as IBudgetPeriod;

    const templateSetList = [
        { value: 'open', text: 'Open Budget Periods' },
        { value: 'closed', text: 'Closed Budget Periods' },
        { value: 'sandbox', text: 'Budget Period Sandbox' },
    ];

    const templateList = ((mode == 'add') && list)
        ? list
            .filter(item =>
                (item.isSandbox == (period.templateSet == 'sandbox')) &&
                (item.isClosed == (period.templateSet == 'closed')))
            .map(item => ({
                value: item.id.toString(),
                text: item.isSandbox
                    ? item.name
                    : `${formatDate(item.start.toString())} to ${formatDate(item.end.toString())}`
            }))
        : [];

    const common = BasicEditViewModel({
        title,
        entity,
        mode,
        item,
        setItem,
        onSubmitted,
        onCancelled
    });

    const getIsValidName = (): boolean => {
        if (!period.name || period.name.length == 0)
            return false;
        const matching = list && list.find((item: IModelItem) =>
            item.name.toUpperCase() == period.name.toUpperCase() &&
            item.id != period.id);
        if (matching)
            return false;
        return true;
    }

    const getIsValidStart = (): boolean => {
        //const matching = list && list.find((item: IModelItem) =>
        //    item.number == period.number &&
        //    item.branch == period.branch &&
        //    item.id != period.id);
        //if (matching)
        //    return false;
        return true;
    }

    const getIsValidEnd = (): boolean => {
        //const matching = list && list.find((item: IModelItem) =>
        //    item.number == period.number &&
        //    item.branch == period.branch &&
        //    item.id != period.id);
        //if (matching)
        //    return false;
        return true;
    }

    const isValidName: boolean = getIsValidName();
    const isValidDescription: boolean = true;
    const isValidStart: boolean = getIsValidStart();
    const isValidEnd: boolean = getIsValidEnd();
    const isValidTemplateId: boolean = true;
    const canSubmit: boolean = period.isSandbox
        ? (isValidName && isValidDescription)
        : (isValidStart && isValidEnd);

    return {
        ...common,

        period,
        templateSetList,
        templateList,

        isValidName,
        isValidDescription,
        isValidStart,
        isValidEnd,
        isValidTemplateId,
        canSubmit,
    };
}
