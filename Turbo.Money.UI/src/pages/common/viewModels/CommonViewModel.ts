import { useState, useEffect } from "react";

import { useAppContext } from 'app/AppContextAccess';

import ICommonItem, { compareItems } from "models/common/ICommonItem";

import ICommonViewModel from "./ICommonViewModel";
import ICommonModeViewModel from "./ICommonModeViewModel";
import ICommonViewModelProps from "./ICommonViewModelProps";

export default function CommonViewModel(
    {
        title,
        modeTitle,
        entity,
        dataProvider,
        initialItem,
        detailsViewModel,
        editViewModel,
    }: ICommonViewModelProps
): ICommonViewModel {

    const module = CommonViewModel.name;
    const category = 'Common';

    const { logger, errors } = useAppContext();

    const [list, setList] = useState<ICommonItem[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [mode, setMode] = useState<string>("none");
    const [modeItemId, setModeItemId] = useState<number | null>(null);
    const [modeItem, setModeItem] = useState<ICommonItem | null>(null);
    const [returnId, setReturnId] = useState<number | null>(null);

    const dialogOpen = (mode === "add" || mode === "edit" || mode === "delete");
    const canSelectItem = !dialogOpen;
    const canAddItem = !dialogOpen;
    const canEditItem = (selectedIndex != null) && !dialogOpen;
    const canDeleteItem = canEditItem;

    const loadData = async () => {
        await retrieveAllItems();
    }

    useEffect(() => {
        retrieveModeItem();
    }, [modeItemId]);

    //  Data Service Methods

    const retrieveAllItems = async () => {
        const context = `${module}.${retrieveAllItems.name}`;
        try {
            const response = await dataProvider.getList();
            logger.debug(category, context, 'response.data =', response.data);

            const newList = response.data.sort(compareItems);
            setList(newList);
        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
        }
    };

    const retrieveModeItem = async () => {
        const context = `${module}.${retrieveModeItem.name}`;
        if (modeItemId) {
            try {
                const response = await dataProvider.get(modeItemId);
                logger.debug(category, context, 'response.data =', response.data);

                setModeItem(response.data);
            } catch (ex) {
                logger.error(category, context, 'ex =', ex);
            }
        }
        else {
            setModeItem(null);
        }
    };

    const createModeItem = async () => {
        const context = `${module}.${createModeItem.name}`;
        try {
            if (!modeItem)
                return errors.createError(context, 'NullData', 'modeItem is null');
            const response = await dataProvider.create(modeItem);
            logger.debug(category, context, 'response.data =', response.data);
            return response.data;
        } catch (ex) {
            return errors.handleCatch(ex, context);
        }
    };

    const updateModeItem = async () => {
        const context = `${module}.${updateModeItem.name}`;
        if (!modeItem || !modeItem.id)
            return errors.createError(context, 'InvalidData', 'modeItem cannot be updated.');

        try {
            const response = await dataProvider.update(modeItem.id, modeItem);
            logger.debug(category, context, 'response.data =', response.data);
            return response.data;
        } catch (ex) {
            return errors.handleCatch(ex, context);
        }
    };

    const deleteModeItem = async () => {
        const context = `${module}.${deleteModeItem.name}`;
        if (!modeItem || !modeItem.id)
            return errors.createError(context, 'InvalidData', 'modeItem cannot be deleted.');

        try {
            const response = await dataProvider.remove(modeItem.id);
            logger.debug(category, context, 'response.data =', response.data);
            return response.data;
        } catch (ex) {
            return errors.handleCatch(ex, context);
        }
    };

    const selectItem = (item: ICommonItem | null | undefined) => {
        if (!item) {
            setModeItemId(null);
            setSelectedIndex(null);
        }
        else {
            setModeItemId(item.id);
            setSelectedIndex(list.findIndex(b => b.id == item.id));
        }
        setMode("details");
    };

    //  Mode Methods

    //  When the ADD button is clicked:
    //    - current item id is saved for later
    //    - selected index is cleared
    //    - item to be edited is set to initial values.
    //    - mode set to "add" to open ADD form.
    //  When the SUBMIT button is clicked:
    //    - new item id is saved for later.
    //    - insert the new item into the item list.
    //    - select the newly added item.
    //    - view item details
    //  When the CANCEL button is clicked:
    //    - select the previously selected item.
    //    - view item details
    const addItem = () => {
        setReturnId(modeItem ? modeItem.id : null);
        setSelectedIndex(null);
        setModeItem(initialItem);
        setMode("add");
    };

    const onAddSubmitted = async () => {
        const createdItem = await createModeItem();

        if (errors.isError(createdItem))
            return;
        const validItem = createdItem as ICommonItem;

        setReturnId(validItem.id);
        const newList = [...list, validItem].sort(compareItems);
        setList(newList);
        selectItem(validItem);
        setSelectedIndex(newList.findIndex(b => b.id == validItem.id));
    };

    const onAddCancelled = () => {
        if (returnId) {
            const item = list.find(item => item.id == returnId);
            selectItem(item);
            setReturnId(null);
        }
        else {
            setMode("none");
        }
    };

    //  When the EDIT button is clicked:
    //    - selected item is not cleared.
    //    - item to be edited is already set from the selected item.
    //    - mode set to "edit" to open EDIT form.
    //  When the SUBMIT button is clicked:
    //    - update the item list from the edited item data.
    //    - select the edited item (should already be selected)
    //  When the CANCEL button is clicked:
    //    - select the previously selected item (should already be selected)
    //    - view item details
    const editItem = () => {
        setMode("edit");
    };

    const onEditSubmitted = async () => {
        const updatedItem = await updateModeItem();

        if (errors.isError(updatedItem))
            return;
        const validItem = updatedItem as ICommonItem;

        const newList = list.map(item => {
            if (item.id == validItem.id) {
                return validItem;
            }
            return item;
        }).sort(compareItems);

        setList(newList);

        selectItem(validItem);
        retrieveModeItem();
    };

    const onEditCancelled = () => {
        retrieveModeItem();
        setMode("details");
    };

    //  When the DELETE button is clicked:
    //    - selected item is not cleared.
    //    - item to be deleted is already set from the selected item.
    //    - mode set to "delete" to open DELETE form.
    //  When the SUBMIT button is clicked:
    //    - update the item list from the deleted item data.
    //    - unselect all items.
    //  When the CANCEL button is clicked:
    //    - select the previously selected item (should already be selected)
    //    - view item details
    const deleteItem = () => {
        setMode("delete");
    };

    const onDeleteSubmitted = async () => {
        const deletedItem = await deleteModeItem();

        if (errors.isError(deletedItem))
            return;
        const validItem = deletedItem as ICommonItem;

        const newList = list
            .filter(item => item.id != validItem.id)
            .sort(compareItems);
        setList(newList);

        setSelectedIndex(null);
        setMode("none");
    };

    const onDeleteCancelled = () => {
        setMode("details");
    };

    let modeViewModel: ICommonModeViewModel;
    switch (mode) {
        case "details":
            modeViewModel = detailsViewModel({
                title: modeTitle,
                entity,
                mode,
                item: modeItem,
            });
            break;
        case "add":
            modeViewModel = editViewModel({
                title: modeTitle,
                entity,
                mode,
                item: modeItem,
                setItem: setModeItem,
                list,
                onSubmitted: onAddSubmitted,
                onCancelled: onAddCancelled
            });
            break;
        case "edit":
            modeViewModel = editViewModel({
                title: modeTitle,
                entity,
                mode,
                item: modeItem,
                setItem: setModeItem,
                list,
                onSubmitted: onEditSubmitted,
                onCancelled: onEditCancelled
            });
            break;
        case "delete":
            modeViewModel = detailsViewModel({
                title: modeTitle,
                entity,
                mode,
                item: modeItem,
                onSubmitted: onDeleteSubmitted,
                onCancelled: onDeleteCancelled
            });
            break;
        default:
            modeViewModel = detailsViewModel({
                title: modeTitle,
                entity,
                mode,
                item: null,
            });
            break;
    }

    return {
        title,
        list,
        selectedIndex,
        mode,
        modeViewModel,

        canSelectItem,
        canAddItem,
        canEditItem,
        canDeleteItem,

        loadData,
        selectItem,
        addItem,
        editItem,
        deleteItem
    }
}
